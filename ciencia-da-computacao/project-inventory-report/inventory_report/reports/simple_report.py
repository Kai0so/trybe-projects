from datetime import datetime
from statistics import mode


class SimpleReport:
    def __init__(self):
        self.oldest_manufactured
        self.closest_expiration
        self.greatest_producer

    @classmethod
    def generate(self, list):
        self.oldest_manufactured = min(
            product["data_de_fabricacao"] for product in list
        )

        self.closest_expiration = min(
            product["data_de_validade"]
            for product in list
            if product["data_de_validade"] > str(datetime.now())
        )

        self.greatest_producer = mode(
            product["nome_da_empresa"] for product in list
        )

        return (
            "Data de fabricação mais antiga: "
            f"{self.oldest_manufactured}\n"
            "Data de validade mais próxima: "
            f"{self.closest_expiration}\n"
            "Empresa com mais produtos: "
            f"{self.greatest_producer}"
        )
