from src import jobs


def get_unique_job_types(path):
    all_job_types = []
    all_jobs = jobs.read(path)
    for job in all_jobs:
        if job["job_type"]:
            all_job_types.append(job["job_type"])
    return set(all_job_types)


def filter_by_job_type(jobs, job_type):
    filtered_jobs = []
    for job in jobs:
        if job["job_type"] == job_type:
            filtered_jobs.append(job)
    return filtered_jobs


def get_unique_industries(path):
    all_industries = []
    all_jobs = jobs.read(path)
    for job in all_jobs:
        if job["industry"]:
            all_industries.append(job["industry"])
    return set(all_industries)


def filter_by_industry(jobs, industry):
    filtered_jobs = []
    for job in jobs:
        if job["industry"] == industry:
            filtered_jobs.append(job)
    return filtered_jobs


def get_max_salary(path):
    salaries = []
    converted_salaries = []
    all_jobs = jobs.read(path)
    for job in all_jobs:
        if job["max_salary"]:
            salaries.append(job["max_salary"])
    for salary in salaries:
        if salary != "invalid":
            converted_salaries.append(int(salary))
    max_salary = max(converted_salaries)
    return max_salary


def get_min_salary(path):
    salaries = []
    converted_salaries = []
    all_jobs = jobs.read(path)
    for job in all_jobs:
        if job["min_salary"]:
            salaries.append(job["min_salary"])
    for salary in salaries:
        if salary != "invalid":
            converted_salaries.append(int(salary))
    min_salary = min(converted_salaries)
    return min_salary


def matches_salary_range(job, salary):
    if (
        ("min_salary" or "max_salary") not in job
        or (type(job["min_salary"] or job["max_salary"]) != int)
        or (job["min_salary"] > job["max_salary"])
        or (type(salary) != int)
    ):
        raise ValueError
    if job["min_salary"] <= salary & salary <= job["max_salary"]:
        return True
    else:
        return False


def filter_by_salary_range(jobs, salary):
    filtered_salaries = []
    for job in jobs:
        try:
            if matches_salary_range(job, salary) is True:
                filtered_salaries.append(job)
        except ValueError:
            pass
    return filtered_salaries
