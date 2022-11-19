from .simple_report import SimpleReport
from collections import Counter


class CompleteReport(SimpleReport):
    @classmethod
    def generate(self, list):
        simple_report = super().generate(list)
        total_products = ""

        company_report = Counter(
            product["nome_da_empresa"] for product in list
        )

        for company in company_report:
            total_products += f"- {company}: {company_report[company]}\n"

        return (
            f"{simple_report}\n"
            "Produtos estocados por empresa:\n"
            f"{total_products}"
        )
