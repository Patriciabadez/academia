export class Usuario {
  constructor(
    public id: number,
    public username: string,
    public email: string,
    public password: string,
    public tipo: 'admin' | 'personal' | 'recepcionista' | 'limpeza' | 'aluno',
    public ativo: boolean
  ) {}
}

export class Funcionario extends Usuario {
  constructor(
    id: number,
    username: string,
    email: string,
    password: string,
    public cargo: 'personal' | 'recepcionista' | 'limpeza'
  ) {
    super(id, username, email, password, cargo, true);
  }
}

export class Aluno extends Usuario {
  constructor(
    id: number,
    username: string,
    email: string,
    password: string,
    public plano: string
  ) {
    super(id, username, email, password, 'aluno', true);
  }
}
