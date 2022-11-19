from collections.abc import Iterator


class InventoryIterator(Iterator):
    def __init__(self, data_list):
        self.data_list = data_list
        self.current_page = 0

    def __next__(self):
        data = self.data_list[self.current_page]
        if not data:
            raise StopIteration()
        self.current_page += 1
        return data
