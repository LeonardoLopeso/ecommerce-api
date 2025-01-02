import { NotFoundError } from "../errors/not-found.error";
import { Company } from "../models/company.model";
import { CompanyRepository } from "../repositories/company.repository";
import { UploadFileService } from "./upload-file.service";

export class CompanyService {

  private companyRepository: CompanyRepository;
  private uploadFileService: UploadFileService;

  constructor() {
    this.companyRepository = new CompanyRepository();
    this.uploadFileService = new UploadFileService("image/companies/");
  }

  async getAll(): Promise<Company[]> {
    return this.companyRepository.getAll();
  }

  async getById(id: string): Promise<Company> {
    const company = await this.companyRepository.getByYd(id);
    if (!company) {
      throw new NotFoundError("Empresa não encontrado!")
    }
    return company;
  }

  async save(company: Company): Promise<void> {
    const logomarcaUrl = await this.uploadFileService.upload(company.logomarca);
    company.logomarca = logomarcaUrl;
    await this.companyRepository.save(company);
  }

  async update(id: string, company: Company): Promise<void> {
    const _company = await this.companyRepository.getByYd(id);
    if (!_company) {
      throw new NotFoundError("Empresa não encontrado!")
    }

    _company.logomarca = company.logomarca;
    _company.cpfCnpj = company.cpfCnpj;
    _company.razaSocial = company.razaSocial;
    _company.nomeFantasia = company.nomeFantasia;
    _company.telefone = company.telefone;
    _company.horarioFuncionamento = company.horarioFuncionamento;
    _company.endereco = company.endereco;
    _company.localizacao = company.localizacao;
    _company.taxaEntrega = company.taxaEntrega;
    _company.ativa = company.ativa;

    await this.companyRepository.update(_company);
  }
}