import xmltodict
from .importer import Importer


class XmlImporter(Importer):
    @classmethod
    def import_data(self, path):
        if path.endswith(".xml") is not True:
            raise ValueError("Arquivo inválido")
        with open(path) as file:
            inventory_reader = file.read()
            results = xmltodict.parse(inventory_reader)
            inventory_list = results["dataset"]["record"]
        return inventory_list
