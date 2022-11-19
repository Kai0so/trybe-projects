from collections.abc import Iterable
from inventory_report.inventory.inventory_iterator import InventoryIterator
from inventory_report.reports.complete_report import CompleteReport
from inventory_report.reports.simple_report import SimpleReport


class InventoryRefactor(Iterable):
    report = {
        "simples": SimpleReport,
        "completo": CompleteReport,
    }

    def __init__(self, importer):
        self.importer = importer
        self.data = []

    def import_data(self, path, type):
        inventory_data = self.importer.import_data(path)
        self.data.extend(inventory_data)
        generated_report = self.report[type].generate(self.data)
        return generated_report

    def __iter__(self):
        return InventoryIterator(self.data)
