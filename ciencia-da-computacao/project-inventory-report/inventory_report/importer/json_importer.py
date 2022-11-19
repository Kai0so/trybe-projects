import json
from .importer import Importer


class JsonImporter(Importer):
    @classmethod
    def import_data(self, path):
        if path.endswith(".json") is not True:
            raise ValueError("Arquivo inválido")
        with open(path) as file:
            inventory_reader = file.read()
            results = json.loads(inventory_reader)
            inventory_list = results
            return inventory_list
