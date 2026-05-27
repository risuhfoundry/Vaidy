from __future__ import annotations

from pathlib import Path
from typing import Any

from .utils import normalize_label, read_colon_bullets


def default_alias_path() -> Path:
    return Path(__file__).with_name("biomarker_aliases.md")


def load_aliases(path: str | Path | None = None) -> dict[str, str]:
    alias_path = Path(path).expanduser().resolve() if path else default_alias_path()
    aliases: dict[str, str] = {}
    for canonical, values, _section in read_colon_bullets(alias_path, {"Aliases"}):
        canonical_key = normalize_canonical_name(canonical)
        aliases[normalize_text_key(canonical)] = canonical_key
        aliases[normalize_text_key(canonical_key)] = canonical_key
        for alias in values.split("|"):
            clean_alias = alias.strip()
            if clean_alias:
                aliases[normalize_text_key(clean_alias)] = canonical_key
    return aliases


def normalize_name(raw_name: str, aliases: dict[str, str] | None = None) -> str:
    lookup = aliases if aliases is not None else load_aliases()
    key = normalize_text_key(raw_name)
    if key in lookup:
        return lookup[key]
    return normalize_canonical_name(raw_name)


def normalize_report(payload: dict[str, Any], aliases: dict[str, str] | None = None) -> dict:
    lookup = aliases if aliases is not None else load_aliases()
    report = {
        "patient_name": clean_optional_text(payload.get("patient_name")),
        "report_date": clean_optional_text(payload.get("report_date")),
        "lab_name": clean_optional_text(payload.get("lab_name")),
        "report_status": normalize_report_status(payload.get("report_status")),
        "biomarkers": {},
    }
    for raw_name, raw_value in biomarker_items(payload.get("biomarkers")):
        name = normalize_name(raw_name, lookup)
        if not name:
            continue
        incoming = normalize_biomarker(raw_value)
        if is_empty_biomarker(incoming):
            continue
        if name in report["biomarkers"]:
            report["biomarkers"][name] = merge_biomarker(report["biomarkers"][name], incoming)
        else:
            report["biomarkers"][name] = incoming
    return report


def merge_reports(base: dict[str, Any], incoming: dict[str, Any]) -> dict:
    result = normalize_report(base)
    other = normalize_report(incoming)
    for field in ("patient_name", "report_date", "lab_name", "report_status"):
        if not result.get(field) and other.get(field):
            result[field] = other[field]
    for name, biomarker in other.get("biomarkers", {}).items():
        if name in result["biomarkers"]:
            result["biomarkers"][name] = merge_biomarker(result["biomarkers"][name], biomarker)
        else:
            result["biomarkers"][name] = biomarker
    return result


def merge_biomarker(base: dict[str, Any], incoming: dict[str, Any]) -> dict:
    result = dict(base)
    for field in ("value", "unit", "ref_range", "flag"):
        if result.get(field) in (None, "") and incoming.get(field) not in (None, ""):
            result[field] = incoming[field]
    return result


def is_empty_biomarker(value: dict[str, Any]) -> bool:
    return all(value.get(field) in (None, "") for field in ("value", "unit", "ref_range", "flag"))


def biomarker_items(raw: Any) -> list[tuple[str, Any]]:
    if isinstance(raw, dict):
        return [(str(name), value) for name, value in raw.items()]
    if isinstance(raw, list):
        items: list[tuple[str, Any]] = []
        for value in raw:
            if not isinstance(value, dict):
                continue
            name = first_present(value, ("name", "biomarker", "test", "test_name"))
            if name:
                items.append((str(name), value))
        return items
    return []


def normalize_biomarker(raw: Any) -> dict:
    if isinstance(raw, dict):
        value = first_present(raw, ("value", "result"))
        unit = first_present(raw, ("unit", "units"))
        ref_range = first_present(raw, ("ref_range", "reference_range", "range"))
        flag = normalize_flag(first_present(raw, ("flag", "status")))
    else:
        value = raw
        unit = None
        ref_range = None
        flag = None
    return {
        "value": to_float(value),
        "unit": clean_optional_text(unit),
        "ref_range": clean_optional_text(ref_range),
        "flag": flag,
    }


def first_present(payload: dict[str, Any], names: tuple[str, ...]) -> Any:
    for name in names:
        if name in payload and payload[name] not in (None, ""):
            return payload[name]
    return None


def clean_optional_text(value: Any) -> str | None:
    if value is None:
        return None
    text = " ".join(str(value).strip().split())
    return text or None


def normalize_report_status(value: Any, path: str | Path | None = None) -> str | None:
    text = clean_optional_text(value)
    if not text:
        return None
    key = normalize_text_key(text)
    if key in load_report_status_values(path):
        return key
    return None


def load_report_status_values(path: str | Path | None = None) -> set[str]:
    metadata_path = Path(path).expanduser().resolve() if path else Path(__file__).with_name("metadata_fields.md")
    values: set[str] = set()
    for _field, raw_values, _section in read_colon_bullets(metadata_path, {"Status Values"}):
        for raw_value in raw_values.split("|"):
            clean = normalize_text_key(raw_value)
            if clean:
                values.add(clean)
    return values


def normalize_flag(value: Any) -> str | None:
    if value is None:
        return None
    text = str(value).strip().upper()
    if text in {"HIGH", "LOW", "NORMAL", "PENDING"}:
        return text
    if text == "H":
        return "HIGH"
    if text == "L":
        return "LOW"
    return None


def normalize_text_key(value: str) -> str:
    return " ".join(str(value or "").strip().lower().replace("_", " ").replace("-", " ").split())


def normalize_canonical_name(value: str) -> str:
    return normalize_label(str(value or "").replace("_", " "))


def to_float(value: Any) -> float | None:
    if value is None:
        return None
    if isinstance(value, bool):
        return None
    if isinstance(value, (int, float)):
        return float(value)
    text = str(value).strip().replace(",", "")
    number: list[str] = []
    dot_used = False
    for character in text:
        if character.isdigit():
            number.append(character)
            continue
        if character == "." and not dot_used:
            number.append(character)
            dot_used = True
            continue
        if character == "-" and not number:
            number.append(character)
            continue
        if number:
            break
    cleaned = "".join(number)
    if cleaned in {"", "-", "."}:
        return None
    try:
        return float(cleaned)
    except ValueError:
        return None
