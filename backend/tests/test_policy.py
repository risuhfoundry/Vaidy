from __future__ import annotations

import tempfile
import unittest
from pathlib import Path

from extractor.main import nim_page_decision
from extractor.normalizer import load_aliases
from extractor.utils import load_extraction_policy, write_json


class PolicyTests(unittest.TestCase):
    def test_loads_runtime_defaults_from_markdown_policy(self):
        policy = load_extraction_policy()
        self.assertEqual(policy.runtime.default_dpi, 120)
        self.assertEqual(policy.nim.model, "nvidia/llama-3.1-nemotron-nano-vl-8b-v1")
        self.assertEqual(policy.nim.timeout_seconds, 45)
        self.assertEqual(policy.nim.retry_attempts, 3)
        self.assertEqual(policy.nim.retry_backoff_seconds, 5)

    def test_page_decision_uses_alias_evidence_not_prompt_words(self):
        policy = load_extraction_policy()
        decision = nim_page_decision(
            "Patient: DUMMY\nLab report table\nHbA1c 5.7 % 4.00-5.60\n",
            policy.page_filter,
            load_aliases(),
        )
        self.assertTrue(decision["selected"])
        self.assertIn("hba1c", decision["matched_aliases"])

    def test_write_json_preserves_pending_debug_payloads(self):
        with tempfile.TemporaryDirectory() as temp_dir:
            path = Path(temp_dir) / "payload.json"
            write_json(path, {"flag": "PENDING"})
            self.assertIn("PENDING", path.read_text(encoding="utf-8"))


if __name__ == "__main__":
    unittest.main()
