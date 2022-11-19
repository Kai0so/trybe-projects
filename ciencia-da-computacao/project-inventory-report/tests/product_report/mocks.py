class MockProductWithoutExpirationDate:
    def __init__(
        self,
        id,
        nome_do_produto,
        nome_da_empresa,
        data_de_fabricacao,
        data_de_validade,
        numero_de_serie,
        instrucoes_de_armazenamento,
    ):
        self.id = id
        self.nome_do_produto = nome_do_produto
        self.nome_da_empresa = nome_da_empresa
        self.data_de_fabricacao = data_de_fabricacao
        self.numero_de_serie = numero_de_serie
        self.instrucoes_de_armazenamento = instrucoes_de_armazenamento
        self.data_de_validade = ""


class MockFailProduct:
    def __init__(
        self,
        id,
        nome_do_produto,
        nome_da_empresa,
        data_de_fabricacao,
        data_de_validade,
        numero_de_serie,
        instrucoes_de_armazenamento,
    ):
        self.id = id
        self.nome_do_produto = nome_do_produto
        self.nome_da_empresa = nome_da_empresa
        self.data_de_fabricacao = data_de_fabricacao
        self.numero_de_serie = numero_de_serie
        self.instrucoes_de_armazenamento = numero_de_serie
        self.data_de_validade = data_de_validade
