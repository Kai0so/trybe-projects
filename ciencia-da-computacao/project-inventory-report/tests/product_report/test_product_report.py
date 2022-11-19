from inventory_report.inventory.product import Product


def test_relatorio_produto():
    product = Product(
        1,
        "xablau",
        "xablauzinho",
        "23/01/1998",
        "23/01/2100",
        "2345678",
        "nenhuma observaçao",
    )

    assert str(product) == (
        "O produto xablau fabricado em 23/01/1998 por xablauzinho "
        "com validade até 23/01/2100 precisa ser armazenado "
        "nenhuma observaçao."
    )
