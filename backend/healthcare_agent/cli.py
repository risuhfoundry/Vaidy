from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

from extractor.main import run_pipeline

from .config import load_agent_settings
from .store import (
    answer_question,
    copy_source_to_storage,
    get_report,
    import_existing_output,
    initialize_database,
    list_reports,
    save_report,
    search_reports,
)


def main(argv: list[str] | None = None) -> int:
    parser = build_parser()
    args = parser.parse_args(argv)
    try:
        return int(args.handler(args) or 0)
    except Exception as exc:
        print(f"Failure: {exc}")
        return 1


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        prog="vaidy-agent",
        description="Terminal AI healthcare agent for local report memory.",
    )
    subparsers = parser.add_subparsers(dest="command", required=True)

    status = subparsers.add_parser("status", help="Show local agent storage status.")
    status.set_defaults(handler=handle_status)

    ingest = subparsers.add_parser("ingest", help="Extract and store a report PDF locally.")
    ingest.add_argument("pdf_path", help="Path to the report PDF.")
    ingest.add_argument("--local-only", action="store_true", help="Skip NIM extraction and use local fallbacks.")
    ingest.add_argument("--output-dir", default=None, help="Output directory for extractor artifacts.")
    ingest.set_defaults(handler=handle_ingest)

    import_json = subparsers.add_parser("import-json", help="Store an existing extractor JSON output.")
    import_json.add_argument("json_path", help="Path to an existing report JSON file.")
    import_json.add_argument("--source-path", default=None, help="Original source report path when known.")
    import_json.set_defaults(handler=handle_import_json)

    list_cmd = subparsers.add_parser("list", help="List stored local reports.")
    list_cmd.set_defaults(handler=handle_list)

    show = subparsers.add_parser("show", help="Show one stored report.")
    show.add_argument("report_id", type=int, help="Local report ID.")
    show.set_defaults(handler=handle_show)

    search = subparsers.add_parser("search", help="Search stored report evidence.")
    search.add_argument("query", help="Search question or phrase.")
    search.add_argument("--limit", type=int, default=None, help="Maximum chunks to return.")
    search.set_defaults(handler=handle_search)

    ask = subparsers.add_parser("ask", help="Answer from local report evidence.")
    ask.add_argument("query", help="Question to answer from local reports.")
    ask.add_argument("--limit", type=int, default=None, help="Maximum evidence chunks to use.")
    ask.set_defaults(handler=handle_ask)

    return parser


def handle_status(_args: argparse.Namespace) -> int:
    settings = load_agent_settings()
    db_path = initialize_database(settings)
    report_count = len(list_reports(settings))
    print("Vaidy terminal healthcare agent")
    print(f"database: {db_path}")
    print(f"reports_dir: {settings.reports_dir}")
    print(f"default_output_dir: {settings.default_output_dir}")
    print(f"local_primary_embeddings: {settings.local_primary}")
    print(f"onnx_model_repo: {settings.local_model_repo}")
    print(f"nvidia_embedding_fallback: {settings.nvidia_model}")
    print(f"stored_reports: {report_count}")
    return 0


def handle_ingest(args: argparse.Namespace) -> int:
    settings = load_agent_settings()
    output_dir = args.output_dir or settings.default_output_dir
    result = run_pipeline(
        args.pdf_path,
        output_dir=output_dir,
        local_only=args.local_only,
    )
    payload = json.loads(Path(result["output_path"]).read_text(encoding="utf-8"))
    copy_source_to_storage(args.pdf_path, settings)
    report_id = save_report(payload, args.pdf_path, result["output_path"], settings)
    print(f"stored_report_id: {report_id}")
    print(f"extractor_source: {result['source']}")
    print(f"biomarkers: {result['biomarker_count']}")
    print(f"output_path: {result['output_path']}")
    return 0


def handle_import_json(args: argparse.Namespace) -> int:
    settings = load_agent_settings()
    report_id = import_existing_output(args.json_path, args.source_path, settings)
    print(f"stored_report_id: {report_id}")
    print(f"json_path: {Path(args.json_path).expanduser().resolve()}")
    return 0


def handle_list(_args: argparse.Namespace) -> int:
    reports = list_reports()
    if not reports:
        print("No local reports stored yet.")
        return 0
    for report in reports:
        patient = report.get("patient_name") or "unknown patient"
        date = report.get("report_date") or "unknown date"
        lab = report.get("lab_name") or "unknown lab"
        count = report.get("biomarker_count")
        print(f"{report['id']}: {patient} | {date} | {lab} | biomarkers={count}")
    return 0


def handle_show(args: argparse.Namespace) -> int:
    record = get_report(args.report_id)
    if record is None:
        print(f"Report not found: {args.report_id}")
        return 1
    report = record["report"]
    print(f"report_id: {record['id']}")
    print(f"patient: {record.get('patient_name') or 'unknown'}")
    print(f"date: {record.get('report_date') or 'unknown'}")
    print(f"lab: {record.get('lab_name') or 'unknown'}")
    print(f"stored_json: {record.get('stored_json_path')}")
    print("biomarkers:")
    for name, value in sorted((report.get("biomarkers") or {}).items()):
        if not isinstance(value, dict):
            continue
        parts = []
        if value.get("value") is not None:
            parts.append(str(value.get("value")))
        if value.get("unit"):
            parts.append(str(value.get("unit")))
        if value.get("ref_range"):
            parts.append(f"ref {value.get('ref_range')}")
        if value.get("flag"):
            parts.append(f"flag {value.get('flag')}")
        detail = " ".join(parts) if parts else "no structured value"
        print(f"- {name}: {detail}")
    return 0


def handle_search(args: argparse.Namespace) -> int:
    hits = search_reports(args.query, limit=args.limit)
    if not hits:
        print("No local report evidence matched.")
        return 0
    for hit in hits:
        print(f"{hit.score:.4f} | report {hit.report_id} | {hit.text}")
    return 0


def handle_ask(args: argparse.Namespace) -> int:
    print(answer_question(args.query, limit=args.limit))
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1:]))
