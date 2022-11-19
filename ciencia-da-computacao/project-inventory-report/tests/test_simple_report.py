from inventory_report.reports.simple_report import SimpleReport
import pytest
from faker import Faker
from tests.factories.product_factory import ProductFactory
from datetime import datetime, timedelta

faker = Faker("pt-BR")

old_date = faker.past_date()
future_date = faker.future_date() + timedelta(days=20)

oldest_date = old_date - timedelta(days=30)
closest_date = datetime.today().date() + timedelta(days=10)
company_bigger_stock = faker.company()


@pytest.fixture
def stock():
    return [
        vars(
            ProductFactory(
                data_de_fabricacao=str(old_date),
                data_de_validade=str(future_date),
            )
        ),
        vars(
            ProductFactory(
                nome_da_empresa=company_bigger_stock,
                data_de_fabricacao=str(old_date),
                data_de_validade=str(future_date),
            )
        ),
        vars(
            ProductFactory(
                nome_da_empresa=company_bigger_stock,
                data_de_fabricacao=str(old_date),
                data_de_validade=str(future_date),
            )
        ),
        vars(
            ProductFactory(
                data_de_fabricacao=str(oldest_date),
                data_de_validade=str(closest_date),
            )
        ),
    ]


@pytest.mark.dependency()
def test_validar_simplereport_retorna_data_de_fabricacao_mais_antiga(stock):
    report = SimpleReport.generate(stock)
    assert f"Data de fabricação mais antiga: {oldest_date}" in report


@pytest.mark.dependency()
def test_validar_simplereport_retorna_validade_mais_proxima(stock):
    report = SimpleReport.generate(stock)
    assert f"Data de validade mais próxima: {closest_date}" in report


@pytest.mark.dependency()
def test_validar_simplereport_retorna_empresa_com_maior_estoque(stock):
    report = SimpleReport.generate(stock)
    expected = f"Empresa com mais produtos: {company_bigger_stock}"
    assert expected in report


@pytest.mark.dependency(
    depends=[
        "test_validar_simplereport_retorna_data_de_fabricacao_mais_antiga",
        "test_validar_simplereport_retorna_validade_mais_proxima",
        "test_validar_simplereport_retorna_empresa_com_maior_estoque",
    ]
)
def test_metodo_generate_de_simplereport_retorna_informacoes_simples():
    pass


def test_validar_simplereport_retorna_formato_correto(stock):
    report = SimpleReport.generate(stock)
    expected = (
        f"Data de fabricação mais antiga: {oldest_date}\n"
        f"Data de validade mais próxima: {closest_date}\n"
        f"Empresa com mais produtos: {company_bigger_stock}"
    )
    assert expected == report
