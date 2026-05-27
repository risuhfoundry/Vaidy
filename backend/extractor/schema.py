from __future__ import annotations

from typing import Literal

from pydantic import BaseModel, Field


class Biomarker(BaseModel):
    value: float | None = None
    unit: str | None = None
    ref_range: str | None = None
    flag: Literal["HIGH", "LOW", "NORMAL", "PENDING"] | None = None


class Report(BaseModel):
    patient_name: str | None = None
    report_date: str | None = None
    lab_name: str | None = None
    report_status: str | None = None
    biomarkers: dict[str, Biomarker] = Field(default_factory=dict)


def validate_report(payload: dict) -> Report:
    return Report(**payload)


def report_to_dict(report: Report) -> dict:
    if hasattr(report, "model_dump"):
        return report.model_dump(exclude_none=True)
    return report.dict(exclude_none=True)
