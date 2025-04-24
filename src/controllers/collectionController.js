import CollectionModel from "../models/collectionModel.js";

class CollectionController {
  // GET /colecoes
  async getAllCollections(req, res) {
    try {
      const colecoes = await CollectionModel.findAll();
      res.json(colecoes);
    } catch (error) {
      console.error("Erro ao buscar as coleções:", error);
      res.status(500).json({ error: "Erro ao buscar as coleções" });
    }
  }

  // GET/colecoes/:id
  async getCollectionById(req, res) {
    try {
      const { id } = req.params;

      const colecao = await CollectionModel.findById(id);

      if (!colecao) {
        return res.status(404).json({ error: "Colecao não encontrada" });
      }

      res.json(colecao);
    } catch (error) {
      console.error("Erro ao buscar coleção:", error);
      res.status(500).json({ error: "Erro ao buscar coleção" });
    }
  }

  // POST /api/personagens
  async createCollection(req, res) {
    try {
      // Validação básica
      const {
        name,
        description,
        releaseYear
      } = req.body;

      // Verifica se todos os campos de coleçãoes foram fornecidas
      if (
        !name ||
        !description ||
        !releaseYear 
       
      ) {
        return res
          .status(400)
          .json({ error: "Todos os campos são obrigatórios" });
      }

      // Criar o novo personagem
      const newCollection = await CollectionModel.create(
        name,
        description,
        releaseYear
        
      );

      if (!newCollection) {
        return res.status(400).json({ error: "Erro ao criar colecao" });
      }

      res.status(201).json(newCollection);
    } catch (error) {
      console.error("Erro ao criar colecao:", error);
      res.status(500).json({ error: "Erro ao criar colecao" });
    }
  }

  // PUT /api/colecoes/:id
  async updateCollection(req, res) {
    try {
      const { id } = req.params;
      const { name, description, releaseYear } = req.body;

      // Atualizar a colecao 
      const updatedCollection = await CollectionModel.update(
        id,
        name,
        description,
        releaseYear
      );

      if (!updatedCollection) {
        return res.status(404).json({ error: "Coleção não encontrada" });
      }

      res.json(updatedCollection);
    } catch (error) {
      console.error("Erro ao atualizar coleção:", error);
      res.status(500).json({ error: "Erro ao atualizar coleção!" });
    }
  }

  // DELETE /api/personagens/:id
  async deleteCollection(req, res) {
    try {
      const { id } = req.params;

      // Remover o personagem
      const result = await PersonagemModel.delete(id);

      if (!result) {
        return res.status(404).json({ error: "Personagem não encontrado" });
      }

      res.status(204).end(); // Resposta sem conteúdo
    } catch (error) {
      console.error("Erro ao remover personagem:", error);
      res.status(500).json({ error: "Erro ao remover personagem" });
    }
  }
}

export default new CollectionController();