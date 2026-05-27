# Todo Completion Check

This backend implements the plan from `todo.md`.

## Completed Items

- Model and timeout: default NIM image model moved away from Maverick to the verified smaller NVIDIA vision model in `extractor/extraction_policy.md`; timeout is 45 seconds.
- Page filtering: NIM image calls use PyMuPDF page text, numeric evidence, and biomarker aliases from `extractor/biomarker_aliases.md` before selecting pages.
- Image size: default image render DPI is 120 in `extractor/extraction_policy.md`.
- Retry logic: image extraction retries provider calls three times with a five second increasing backoff.
- Interim reports: `report_status` and `PENDING` biomarker flags are supported by schema, normalization, prompt, and metadata markdown.
- Mixed-page prompt: `extractor/nim_prompt.md` tells the model to ignore interpretation, note, legal, and guidance-only rows and to return an empty biomarkers object when no valid rows exist.

## Verification

Run from `backend/`:

```bash
python -m pytest -q
python -m compileall -q extractor tests
python -m extractor.main samples/report1.pdf --local-only --output-dir outputs/verify-report1-local
python -m extractor.main samples/report2.pdf --local-only --output-dir outputs/verify-report2-local
python -m extractor.main samples/report3.pdf --local-only --output-dir outputs/verify-report3-local
python -m extractor.main samples/scanned_report.pdf --local-only --output-dir outputs/verify-scanned-local
```

With `NVIDIA_API_KEY` configured, this was also verified from the source backend
with:

```bash
python -m extractor.main samples/report2.pdf --output-dir outputs/verify-report2-nim-status-final
```

The live NIM run returned `Source: nim` and `Biomarkers: 5`.
