import textract from "textract";
import path from "path";
import { convertDDMMYYYYtoYYYYMMDD } from "./date";

export function parseFile(filePath: string) {
  return new Promise((resolve, reject) => {
    textract.fromFileWithPath(path.resolve(filePath), (error, text) => {
      if (error) reject(error.message);
      resolve(parser(text));
    });
  });
}

function parser(text: string) {
  const person = {
    name: getName(text),
    rg: getRg(text),
    rgEmissionDate: formatDate(getEmissao(text)),
    cpf: formatCpf(getCpf(text)),
    birthDate: formatDate(getDate(text)),
    voterTitle: getVoterTitle(text),
    voterZone: getVoterZone(text),
    voterSession: getVoterSection(text),
    birthCity: birthPlace(text),
    birthState: birthPlaceUf(text),
    fatherName: getFatherName(text),
    motherName: getMotherName(text),
    phoneNumber: getPhone(text),
    address: getAddress(text),
    email: getEmail(text),
    bloodType: getBloodType(text),
    congregationPlace: getCongregatePlace(text),
    role: getRole(text),
    baptismDate: formatDate(getBaptismDate(text)),
    civilState: getCivilState(text),
    education: getSchooling(text),
  };

  return person;
}

const formatDate = (date: string) => convertDDMMYYYYtoYYYYMMDD(date);

const getName = (text: string) => getContent(text, "NOME: ", "RG:");

const getRg = (text: string) => getContent(text, "RG: ", "EMISSÃO:");

const getEmissao = (text: string) =>
  getContent(text, "EMISSÃO: ", "CPF:").replace(".", "-").replace(".", "-");

const getCpf = (text: string) => getContent(text, "CPF: ", "Data nascimento:");

const formatCpf = (cpf: string) => cpf.replace(" ", ".").replace(" ", ".");

const getDate = (text: string) =>
  getContent(text, "Data nascimento: ", "Titulo:")
    .replace(".", "-")
    .replace(".", "-")
    .trimEnd();

const getVoterTitle = (text: string) => getContent(text, "Titulo: ", "ZONA");

const getVoterZone = (text: string) => getContent(text, "ZONA: ", "SEÇÃO:");

const getVoterSection = (text: string) => getContent(text, "SEÇÃO: ", "LOCAL");

const birthPlace = (text: string) =>
  getContent(text, "LOCAL DE NASCIMENTO: ", "UF: ");

const birthPlaceUf = (text: string) => getContent(text, "UF: ", "FILIAÇÃO: ");

const getFatherName = (text: string) => getContent(text, "PAI: ", "MÃE:");

const getMotherName = (text: string) => getContent(text, "MÃE: ", "TELEFONE");

const getPhone = (text: string) => getContent(text, "TELEFONE ", "- ").trim();

const getAddress = (text: string) => getContent(text, "ENDEREÇO: ", "E-Mail: ");

const getEmail = (text: string) =>
  getContent(text, "E-Mail: ", "Tipo").replace(" ", "").trim().toLowerCase();

const getBloodType = (text: string) =>
  getContent(text, "Tipo sanguíneo: ", "LUGAR QUE");

const getCongregatePlace = (text: string) =>
  getContent(text, "CONGREGA: ", "CARGO");

const getRole = (text: string) =>
  getContent(text, "MINISTERIAL: ", "DATA DE BATISMO:");

const getBaptismDate = (text: string) =>
  getContent(text, "DATA DE BATISMO: ", "ESTADO CIVIL")
    .replace(".", "-")
    .replace(".", "-");

const getCivilState = (text: string) =>
  getContent(text, "ESTADO CIVIL: ", "CÔNJUGUE");

const getSchooling = (text: string) =>
  getContent(text, "ESCOLARIDADE:", "ASSINATURA");

const getContent = (text: string, first: string, last: string) =>
  text.split(first)[1].split(last)[0].trimEnd();
