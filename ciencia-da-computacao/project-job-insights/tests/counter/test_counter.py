from src.counter import count_ocurrences


def test_counter():
    python_counter = count_ocurrences("src/jobs.csv", "Python")
    assert python_counter == 1639
