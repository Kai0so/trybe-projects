from inventory_report.inventory.product import Product


def test_cria_produto():
    product = Product(
        1,
        "xablau",
        "xablauzinho",
        "23/01/1998",
        "23/01/2100",
        "2345678",
        "nenhuma observaçao",
    )

    assert product.id == 1
    assert product.nome_da_empresa == "xablauzinho"
    assert product.nome_do_produto == "xablau"
    assert product.data_de_fabricacao == "23/01/1998"
    assert product.data_de_validade == "23/01/2100"
    assert product.numero_de_serie == "2345678"
    assert product.instrucoes_de_armazenamento == "nenhuma observaçao"
