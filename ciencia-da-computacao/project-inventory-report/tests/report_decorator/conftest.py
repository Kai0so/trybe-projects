from unittest.mock import patch
import pytest
from .mocks import MockColoredReport
from inventory_report.reports.colored_report import ColoredReport
from tests.marker import mark_dependency, mark_xfail

mocked_tests = [
    "test_decorar_relatorio[simple_generate]",
    "test_decorar_relatorio[green_generate]",
    "test_decorar_relatorio[only_company_generate]",
]

mocking = [
    mark_xfail(MockColoredReport.simple_generate),
    mark_xfail(MockColoredReport.green_generate),
    mark_xfail(MockColoredReport.only_company_generate),
    mark_dependency(ColoredReport.generate, mocked_tests),
]


@pytest.fixture(autouse=True, params=mocking)
def mock_it(request):
    with patch(
        "tests.report_decorator.test_report_decorator.ColoredReport.generate",
        request.param,
    ):
        yield
