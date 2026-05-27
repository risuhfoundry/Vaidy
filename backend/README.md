# Vaidy Extractor

NIM-first PDF biomarker extraction for Indian lab reports.

## Setup

```powershell
python -m pip install -r requirements.txt
Copy-Item .env.example .env
```

Set `NVIDIA_API_KEY` in `.env`, then run:

```powershell
python -m extractor.main samples/report1.pdf
```

The pipeline saves:

- `outputs/debug_text.txt` for the best local text layer found.
- `outputs/debug_quality.json` for the text quality gate.
- `outputs/<pdf-name>.json` for the clean validated report.
- `outputs/report.json` as the latest report path.

## Extraction Order

1. Extract the local PyMuPDF text layer per page for fast page triage.
2. Convert the PDF to page images with the DPI from `extractor/extraction_policy.md`.
3. Send only locally relevant pages to NVIDIA NIM for structured JSON; scanned PDFs with no text layer still go through image extraction.
4. Retry NIM image calls using the retry settings in `extractor/extraction_policy.md`.
5. Fill missing fields from local text when Docling or PyMuPDF text is usable.
6. Fall back to PaddleOCR plus rule-based parsing when the text layer is poor.
7. Normalize biomarker names from `extractor/biomarker_aliases.md`.
8. Validate output with Pydantic before saving.

The default NIM model, timeout, retry counts, page-filter thresholds, and image
DPI live in `extractor/extraction_policy.md`. The default model is a smaller
available NVIDIA vision model so ordinary reports do not start on Maverick.
Environment variables in `.env` can override NIM provider settings for one
machine without changing code.
