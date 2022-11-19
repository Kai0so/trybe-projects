from unittest.mock import patch
import pytest
from .mocks import MockProductWithoutExpirationDate, MockFailProduct
from inventory_report.inventory.product import Product
from tests.marker import mark_dependency, mark_xfail

mocked_tests = [
    "test_relatorio_produto[MockProductWithoutExpirationDate]",
    "test_relatorio_produto[MockFailProduct]",
]

mocking = [
    mark_xfail(MockProductWithoutExpirationDate),
    mark_xfail(MockFailProduct),
    mark_dependency(Product, mocked_tests),
]


@pytest.fixture(autouse=True, params=mocking)
def mock_it(request):
    with patch(
        "tests.product_report.test_product_report.Product",
        request.param,
    ):
        yield
