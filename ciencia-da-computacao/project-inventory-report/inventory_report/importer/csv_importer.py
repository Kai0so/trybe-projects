import csv
from .importer import Importer


class CsvImporter(Importer):
    @classmethod
    def import_data(self, path):
        if path.endswith(".csv") is not True:
            raise ValueError("Arquivo inválido")
        with open(path, encoding="utf-8") as file:
            inventory_reader = csv.DictReader(
                file, delimiter=",", quotechar='"'
            )
            inventory_list = list(inventory_reader)
        return inventory_list
