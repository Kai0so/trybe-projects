import sys
from .inventory.inventory_refactor import InventoryRefactor
from .importer.csv_importer import CsvImporter
from .importer.json_importer import JsonImporter
from .importer.xml_importer import XmlImporter


def main():
    importer = {
        "csv": CsvImporter,
        "json": JsonImporter,
        "xml": XmlImporter,
    }
    if len(sys.argv) < 3:
        sys.stderr.write("Verifique os argumentos\n")
    else:
        path = sys.argv[1]
        report_type = sys.argv[2]
        importer_type = path.split(".")[1]
        inventory = InventoryRefactor(importer[importer_type])
        generated_report = inventory.import_data(path, report_type)
        print(generated_report, end="")
