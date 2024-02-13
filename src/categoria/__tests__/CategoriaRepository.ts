import { CategoriaRepository, resetCategoriasDB } from '../CategoriaRepository'

const repository = new CategoriaRepository()

beforeEach(() => {
  resetCategoriasDB()
})

describe('Listar categorias', () => {
  it('Lista categorias existentes', () => {
    expect(repository.listar()).toHaveLength(3)
  })
})

describe('Obter categoria', () => {
  it('Obtém categoria pelo path', () => {
    const cat = { path: 'senhor-dos-aneis', nome: 'Senhor dos Anéis' }
    expect(repository.obter('senhor-dos-aneis')).toEqual(cat)
  })

  it('Não obtém, path inexistente', () => {
    expect(repository.obter('tom-bombadil')).toBeUndefined()
  })
})

describe('Salvar categoria', () => {
  it('Cadastra nova categoria', () => {
    const cat = { path: 'two-towers', nome: 'As Duas Torres' }
    repository.salvar(cat)
    expect(repository.obter('two-towers')).toEqual(cat)
  })

  it('Não salva, path não informado', () => {
    const cat = { path: '', nome: 'O Retorno do Rei' }
    expect(repository.salvar(cat)).toBeUndefined()
  })

  it('Atualiza categoria de mesmo path', () => {
    const path = 'the-return'
    repository.salvar({ path, nome: 'The Return' })
    expect(repository.obter(path).nome).toBe('The Return')

    repository.salvar({ path, nome: 'The Return of The King' })
    expect(repository.obter(path).nome).toBe('The Return of The King')
  })
})

describe('Excluir categoria', () => {
  it('Exclui categora do path informado', () => {
    expect(repository.excluir('react')).toBe('react')
  })

  it('Não exclui, path inexistente', () => {
    expect(repository.excluir('nao-existente')).toBe('')
  })
})
