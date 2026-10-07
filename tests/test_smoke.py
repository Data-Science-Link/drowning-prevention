"""Smoke tests — verify the package imports and basic invariants hold."""

import guardian_goggles


def test_package_importable():
    assert guardian_goggles is not None


def test_version_string():
    assert isinstance(guardian_goggles.__version__, str)
    assert len(guardian_goggles.__version__) > 0


def test_alert_states_are_distinct():
    """
    Encode the core product invariant: Lost Connection and SubmersionSuspect
    must be distinct states. This test is intentionally simple — it will grow
    as the alert-state module is built out in later PRs.
    """
    lost_connection = "lost_connection"
    submersion_suspect = "submersion_suspect"
    assert lost_connection != submersion_suspect
