from functools import lru_cache
import csv


@lru_cache
def read(path):
    with open(path, encoding="utf-8") as file:
        jobs_reader = csv.DictReader(file, delimiter=",", quotechar='"')
        all_jobs = list(jobs_reader)
    return all_jobs
