// Importe de arquivos
import contas from "../models/Conta.js";

// Definindo classe e métodos
class ContaController {
  static listarContas = async (req, res, next) => {
    try {
      const contaResultados = await contas.find();
      res.status(200).json(contaResultados);
    } catch (erro) {
      next(erro);
    }
  };
  static listarContaPorNome = async (req, res, next) => {
    try {
      const titular = req.query.titular;
      const contaResultados = await contas.find({ titular: titular }, {});
      res.status(200).send(contaResultados);
    } catch (erro) {
      next(erro);
    }
  };
  static listarContaPorCC = async (req, res, next) => {
    try {
      const cc = req.query.cc;
      const contaResultados = await contas.find({ cc: cc }, {});
      res.status(200).send(contaResultados);
    } catch (erro) {
      next(erro);
    }
  };

  static listarContasPorId = async (req, res, next) => {
    try {
      const id = req.params.id;
      const contaResultados = await contas.findById(id);
      if (contaResultados !== null) {
        res.status(200).send(contaResultados);
      } else {
        res.status(404).send({ message: "Id da conta não localizado" });
      }
    } catch (erro) {
      next(erro);
    }
  };
  static cadastrarContas = async (req, res, next) => {
    try {
      let conta = new contas(req.body);
      await conta.save();
      res.status(201).send({ message: "Conta cadastrada com sucesso" });
    } catch (erro) {
      next(erro);
    }
  };
  static atualizarContas = async (req, res, next) => {
    try {
      const id = req.params.id;
      await contas.findByIdAndUpdate(id, { $set: req.body });
      res.status(200).send({ message: "Conta atualizada com sucesso" });
    } catch (erro) {
      next(erro);
    }
  };
  static excluirContas = async (req, res, next) => {
    try {
      const id = req.params.id;
      const contaResultados = await contas.findByIdAndDelete(id);
      if (contaResultados !== null) {
        res.status(200).send({ message: "Conta removida com sucesso" });
      } else {
        // eslint-disable-next-line no-undef
        next(new NaoEncontrado("Id da conta não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  };
}

// exportando objeto*
export default ContaController;
