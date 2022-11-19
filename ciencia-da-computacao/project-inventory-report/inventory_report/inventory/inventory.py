import csv
import json
import xmltodict
from inventory_report.reports.simple_report import SimpleReport
from inventory_report.reports.complete_report import CompleteReport


class Inventory:
    @classmethod
    def import_data(self, path, type):
        if path.endswith(".csv"):
            with open(path, encoding="utf-8") as file:
                inventory_reader = csv.DictReader(
                    file, delimiter=",", quotechar='"'
                )
                inventory_list = list(inventory_reader)
        elif path.endswith(".json"):
            with open(path) as file:
                inventory_reader = file.read()
                results = json.loads(inventory_reader)
                inventory_list = results
        else:
            with open(path) as file:
                inventory_reader = file.read()
                results = xmltodict.parse(inventory_reader)
                inventory_list = results["dataset"]["record"]
        if type == "simples":
            return SimpleReport.generate(inventory_list)
        elif type == "completo":
            return CompleteReport.generate(inventory_list)
