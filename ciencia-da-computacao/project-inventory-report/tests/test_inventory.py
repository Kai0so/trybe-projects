from inventory_report.inventory.inventory import Inventory
import pytest


@pytest.mark.dependency()
def test_validar_importerdata_importar_um_arquivo_csv_simples():
    expect = (
        "Data de fabricação mais antiga: 2020-09-06\n"
        "Data de validade mais próxima: 2023-09-17\n"
        "Empresa com mais produtos: Target Corporation"
    )
    report = Inventory.import_data(
        "inventory_report/data/inventory.csv", "simples"
    )
    assert expect == report


@pytest.mark.dependency()
def test_validar_importerdata_importar_um_arquivo_csv_completo():
    expect = (
        "Data de fabricação mais antiga: 2020-09-06\n"
        "Data de validade mais próxima: 2023-09-17\n"
        "Empresa com mais produtos: Target Corporation\n"
        "Produtos estocados por empresa:\n"
        "- Target Corporation: 4\n"
        "- Galena Biopharma: 2\n"
        "- Cantrell Drug Company: 2\n"
        "- Moore Medical LLC: 1\n"
        "- REMEDYREPACK: 1\n"
    )
    report = Inventory.import_data(
        "inventory_report/data/inventory.csv", "completo"
    )
    assert report == expect


@pytest.mark.dependency()
def test_validar_importerdata_importar_um_arquivo_json_simples():
    expect = (
        "Data de fabricação mais antiga: 2020-09-06\n"
        "Data de validade mais próxima: 2023-09-17\n"
        "Empresa com mais produtos: Target Corporation"
    )
    report = Inventory.import_data(
        "inventory_report/data/inventory.json", "simples"
    )
    assert report == expect


@pytest.mark.dependency()
def test_validar_importerdata_importar_um_arquivo_json_completo():
    expect = (
        "Data de fabricação mais antiga: 2020-09-06\n"
        "Data de validade mais próxima: 2023-09-17\n"
        "Empresa com mais produtos: Target Corporation\n"
        "Produtos estocados por empresa:\n"
        "- Target Corporation: 4\n"
        "- Galena Biopharma: 2\n"
        "- Cantrell Drug Company: 2\n"
        "- Moore Medical LLC: 1\n"
        "- REMEDYREPACK: 1\n"
    )
    report = Inventory.import_data(
        "inventory_report/data/inventory.json", "completo"
    )
    assert expect == report


@pytest.mark.dependency()
def test_validar_importerdata_importar_um_arquivo_xml_simples():
    expect = (
        "Data de fabricação mais antiga: 2020-09-06\n"
        "Data de validade mais próxima: 2023-09-17\n"
        "Empresa com mais produtos: Target Corporation"
    )
    report = Inventory.import_data(
        "inventory_report/data/inventory.xml", "simples"
    )
    assert expect == report


@pytest.mark.dependency()
def test_validar_importerdata_importar_um_arquivo_xml_completo():
    expect = (
        "Data de fabricação mais antiga: 2020-09-06\n"
        "Data de validade mais próxima: 2023-09-17\n"
        "Empresa com mais produtos: "
        "Target Corporation\n"
        "Produtos estocados por empresa:\n"
        "- Target Corporation: 4\n"
        "- Galena Biopharma: 2\n"
        "- Cantrell Drug Company: 2\n"
        "- Moore Medical LLC: 1\n"
        "- REMEDYREPACK: 1\n"
    )
    report = Inventory.import_data(
        "inventory_report/data/inventory.xml", "completo"
    )
    assert expect == report


@pytest.mark.dependency(
    depends=[
        "test_validar_importerdata_importar_um_arquivo_csv_simples",
        "test_validar_importerdata_importar_um_arquivo_csv_completo",
    ]
)
def test_importe_arquivos_CSV_pelo_metodo_import_data():
    pass


@pytest.mark.dependency(
    depends=[
        "test_validar_importerdata_importar_um_arquivo_json_simples",
        "test_validar_importerdata_importar_um_arquivo_json_completo",
    ]
)
def test_importe_arquivos_JSON_pelo_metodo_import_data():
    pass


@pytest.mark.dependency(
    depends=[
        "test_validar_importerdata_importar_um_arquivo_xml_simples",
        "test_validar_importerdata_importar_um_arquivo_xml_completo",
    ]
)
def test_importe_arquivos_XML_pelo_metodo_import_data():
    pass
