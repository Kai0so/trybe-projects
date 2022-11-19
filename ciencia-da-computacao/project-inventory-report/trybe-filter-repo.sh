### GIT FILTER-REPO ###

 ## NÃO EXECUTE ESSE SCRIPT DIRETAMENTE
 ## Esse script foi feito para uso do
 ## script 'publisher.sh' fornecido 
 ## pela Trybe. 

 [[ $# == 1 ]] && \
 [[ $1 == "trybe-security-parameter" ]] && \
 git filter-repo \
     --path .trybe \
     --path .github \
     --path trybe.yml \
     --path trybe-filter-repo.sh \
     --path tests/test_complete_report.py \
     --path tests/test_importer.py \
     --path tests/test_inventory.py \
     --path tests/test_inventory_refactor.py \
     --path tests/test_main.py \
     --path tests/test_simple_report.py \
     --path tests/marker.py \
     --path tests/product/conftest.py \
     --path tests/product/mocks.py \
     --path tests/product_report/conftest.py \
     --path tests/product_report/mocks.py \
     --path tests/report_decorator/conftest.py \
     --path tests/report_decorator/mocks.py \
     --path .images \
     --path README.md \
     --invert-paths --force
