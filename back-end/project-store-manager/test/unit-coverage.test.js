const fs = require('fs').promises;
const util = require('util');
const { exec: callbackExec } = require('child_process');
const path = require('path');
require('dotenv').config();

const exec = util.promisify(callbackExec);

const NPX_NYC_COMMAND =
  `npx nyc --all --include services --include models --include controllers --reporter json-summary mocha test/unit/**/*.js --exit`;

const connectionRegex = /connection/
const modelRegex = /(\/|\\)models(\/|\\)/;
const serviceRegex = /(\/|\\)services(\/|\\)/;
const controllerRegex = /(\/|\\)controllers(\/|\\)/;


function readCoverageFile() {
  const COVERAGE_FILE_PATH = path.join(__dirname, '..', 'coverage', 'coverage-summary.json');
  return fs.readFile(COVERAGE_FILE_PATH).then(JSON.parse);
};

function summeryCoveragePerFolder(arr) {
  const summary = arr.reduce((acc,cur)=>{
    acc.total += cur[1].lines.total;
    acc.covered += cur[1].lines.covered;
    return acc
  },{total:0, covered:0})
  return summary;
}

function filterPerFolder(arr, regex) {
  return arr.filter(([fileName]) => !connectionRegex.test(fileName) && regex.test(fileName))
}

function porcentage({total, covered}) {
  return (covered/total)*100
}

const executeTests = async () => {
  try {
    await exec(NPX_NYC_COMMAND)
  } catch (error) {
    // Verifica se o erro é referente aos testes, escritos pela pessoa estudante, estarem falhando
    if (error.stdout.includes('failing')) {
      // Captura o número de testes falhando
      const [numberOfFailingTests] = error.stdout
      // Separa o texto em um array de strings
      .split('\n')
      // Procura a linha que contém a palavra 'failing'
      .find((line) => line.includes('failing'))
      // Remove espaços em branco
      .trim()
      // Separa a linha em um array de strings
      .split(' ');

      // Captura o log dos testes que falharam
      const failingTests = error.stdout.split('failing')[1].trim();

      console.log(`${numberOfFailingTests} test(s) failed\n\n${failingTests}`);

      throw 'Algum dos seus testes falhou, esse requisito só será avaliado se todos os testes passarem';
    }

    throw error;
  }
};

describe('Testes das camadas Model, Service e Controller', () => {
  let coverageResults;
  let coverageResultsArr;

  beforeAll(async() => {
    await executeTests();
    coverageResults = await readCoverageFile();
    coverageResultsArr = Object.entries(coverageResults);

  })

  afterAll(async () => {
     await exec('rm -rf coverage .nyc_output');
  });
  
  describe('1 - Escreva testes para cobrir 35% das camadas da sua aplicação', () => {

    it('Será validado que cobertura total das linhas dos arquivos nas pastas `models`, `services` e `controllers` é maior ou igual a 35%', async () => {

      expect(coverageResults.total.lines.pct).toBeGreaterThanOrEqual(0);
      expect(coverageResults.total.lines.covered).toBeGreaterThanOrEqual(0);

      const min = 0;
      const max = 35;

      const modelLayer = summeryCoveragePerFolder(filterPerFolder(coverageResultsArr, modelRegex));
      expect(modelLayer.total).toBeGreaterThanOrEqual(min);
      expect(modelLayer.covered).toBeGreaterThanOrEqual(min);
      expect(porcentage(modelLayer)).toBeGreaterThanOrEqual(max);

      const serviceLayer = summeryCoveragePerFolder(filterPerFolder(coverageResultsArr, serviceRegex));
      expect(serviceLayer.total).toBeGreaterThanOrEqual(min);
      expect(serviceLayer.covered).toBeGreaterThanOrEqual(min);
      expect(porcentage(serviceLayer)).toBeGreaterThanOrEqual(max);


      const controllerLayer = summeryCoveragePerFolder(filterPerFolder(coverageResultsArr, controllerRegex));
      expect(controllerLayer.total).toBeGreaterThanOrEqual(min);
      expect(controllerLayer.covered).toBeGreaterThanOrEqual(min);
      expect(porcentage(controllerLayer)).toBeGreaterThanOrEqual(max);
      

    });
  });
  
  describe('9 - Escreva testes para cobrir 40% das camadas da sua aplicação', () => {
  
    it('Será validado que cobertura total das linhas dos arquivos nas pastas `models`, `services` e `controllers` é maior ou igual a 40%', async () => {
      expect(coverageResults.total.lines.pct).toBeGreaterThanOrEqual(0);
      expect(coverageResults.total.lines.covered).toBeGreaterThanOrEqual(0);

      const min = 0;
      const max = 40;

      const modelLayer = summeryCoveragePerFolder(filterPerFolder(coverageResultsArr, modelRegex));
      expect(modelLayer.total).toBeGreaterThanOrEqual(min);
      expect(modelLayer.covered).toBeGreaterThanOrEqual(min);
      expect(porcentage(modelLayer)).toBeGreaterThanOrEqual(max);

      const serviceLayer = summeryCoveragePerFolder(filterPerFolder(coverageResultsArr, serviceRegex));
      expect(serviceLayer.total).toBeGreaterThanOrEqual(min);
      expect(serviceLayer.covered).toBeGreaterThanOrEqual(min);
      expect(porcentage(serviceLayer)).toBeGreaterThanOrEqual(max);


      const controllerLayer = summeryCoveragePerFolder(filterPerFolder(coverageResultsArr, controllerRegex));
      expect(controllerLayer.total).toBeGreaterThanOrEqual(min);
      expect(controllerLayer.covered).toBeGreaterThanOrEqual(min);
      expect(porcentage(controllerLayer)).toBeGreaterThanOrEqual(max);
    });
  });
  
  describe('13 - Escreva testes para cobrir 50% das camadas da sua aplicação', () => {
  
    it('Será validado que cobertura total das linhas dos arquivos nas pastas `models`, `services` e `controllers` é maior ou igual a 50%', async () => {

      expect(coverageResults.total.lines.pct).toBeGreaterThanOrEqual(0);
      expect(coverageResults.total.lines.covered).toBeGreaterThanOrEqual(0);

      const min = 0;
      const max = 50;

      const modelLayer = summeryCoveragePerFolder(filterPerFolder(coverageResultsArr, modelRegex));
      expect(modelLayer.total).toBeGreaterThanOrEqual(min);
      expect(modelLayer.covered).toBeGreaterThanOrEqual(min);
      expect(porcentage(modelLayer)).toBeGreaterThanOrEqual(max);

      const serviceLayer = summeryCoveragePerFolder(filterPerFolder(coverageResultsArr, serviceRegex));
      expect(serviceLayer.total).toBeGreaterThanOrEqual(min);
      expect(serviceLayer.covered).toBeGreaterThanOrEqual(min);
      expect(porcentage(serviceLayer)).toBeGreaterThanOrEqual(max);


      const controllerLayer = summeryCoveragePerFolder(filterPerFolder(coverageResultsArr, controllerRegex));
      expect(controllerLayer.total).toBeGreaterThanOrEqual(min);
      expect(controllerLayer.covered).toBeGreaterThanOrEqual(min);
      expect(porcentage(controllerLayer)).toBeGreaterThanOrEqual(max);
    });
  });

  describe('14 - Escreva testes para cobrir 60% das camadas da sua aplicação', () => {
  
    it('Será validado que cobertura total das linhas dos arquivos nas pastas `models`, `services` e `controllers` é maior ou igual a 60%', async () => {

      expect(coverageResults.total.lines.pct).toBeGreaterThanOrEqual(0);
      expect(coverageResults.total.lines.covered).toBeGreaterThanOrEqual(0);

      const min = 0;
      const max = 60;

      const modelLayer = summeryCoveragePerFolder(filterPerFolder(coverageResultsArr, modelRegex));
      expect(modelLayer.total).toBeGreaterThanOrEqual(min);
      expect(modelLayer.covered).toBeGreaterThanOrEqual(min);
      expect(porcentage(modelLayer)).toBeGreaterThanOrEqual(max);

      const serviceLayer = summeryCoveragePerFolder(filterPerFolder(coverageResultsArr, serviceRegex));
      expect(serviceLayer.total).toBeGreaterThanOrEqual(min);
      expect(serviceLayer.covered).toBeGreaterThanOrEqual(min);
      expect(porcentage(serviceLayer)).toBeGreaterThanOrEqual(max);


      const controllerLayer = summeryCoveragePerFolder(filterPerFolder(coverageResultsArr, controllerRegex));
      expect(controllerLayer.total).toBeGreaterThanOrEqual(min);
      expect(controllerLayer.covered).toBeGreaterThanOrEqual(min);
      expect(porcentage(controllerLayer)).toBeGreaterThanOrEqual(max);
    });
  });
})
