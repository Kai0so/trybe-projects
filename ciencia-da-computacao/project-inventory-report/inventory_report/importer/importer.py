from abc import abstractmethod


class Importer:
    @classmethod
    @abstractmethod
    def import_data(self, path, type):
        raise NotImplementedError
