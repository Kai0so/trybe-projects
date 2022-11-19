class MockColoredReport:
    def __init__(self, report_type):
        self.report_type = report_type

    def simple_generate(self, products_list):
        report = self.report_type.generate(products_list)
        return report

    def green_generate(self, products_list):
        report = self.report_type.generate(products_list)
        green_phrases = [
            "Data de fabricação mais antiga:",
            "Data de validade mais próxima:",
            "Empresa com mais produtos:",
        ]

        for phrase in green_phrases:
            report = report.replace(
                phrase,
                f"\033[32m{phrase}\033[0m",
            )

        return report

    def only_company_generate(self, products_list):
        report = self.report_type.generate(products_list)
        index_start = report.find("mais produtos:") + 15
        index_finish = report.find("\n", index_start)
        if index_finish == -1:
            index_finish = len(report)

        report = (
            report[:index_start]
            + "\033[31m"
            + report[index_start:index_finish]
            + "\033[0m"
            + report[index_finish:]
        )

        return report
