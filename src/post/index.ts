export { PostService } from './PostService'
export { PostRepository } from './PostRepository'

export type UserPost = {
  id?: string
  titulo: string
  corpo: string
  autor: string
  categoria: string
  timestamp: number
  nota: number
  numeroComentarios: number
}

export type Posts = {
  [key: string]: UserPost
}

export type PostsPage = {
  posts: UserPost[]
  pagina: number
  tamanho: number
  total: number
}

export type PostParams = Pick<UserPost, 'titulo' | 'corpo' | 'autor' | 'categoria'>
