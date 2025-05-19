import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';

interface Posto {
  id: number;
  preco: number;
  tipoCombustivel?: string;
}

interface CombustivelInfo {
  nome: string;
  descricao: string;
  vantagens: string[];
  desvantagens: string[];
  eficiencia: string;
}

@Component({
  selector: 'app-calculadora-consumo',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, MenuComponent],
  templateUrl: './calculadora-consumo.component.html',
  styleUrls: ['./calculadora-consumo.component.scss']
})
export class CalculadoraConsumoComponent {
  // Campos do formulário
  distancia: number | null = null;
  litros: number | null = null;
  precoLitro: number | null = null;
  tipoCombustivel: string = '';

  // Lista de postos
  postos: Posto[] = [];
  proximoId: number = 1;

  // Resultados
  consumoMedio: number | null = null;
  mediaPrecos: number | null = null;
  precoMaisBarato: number | null = null;
  precoMaisCaro: number | null = null;

  // Mensagens
  mensagemErro: string = '';
  showInfoCombustivel: boolean = false;
  combustivelSelecionado: CombustivelInfo | null = null;

  // Informações dos combustíveis
  combustiveis: CombustivelInfo[] = [
    {
      nome: 'Gasolina Comum',
      descricao: 'Combustível mais utilizado no Brasil, com octanagem mínima de 92.',
      vantagens: [
        'Maior disponibilidade nos postos',
        'Melhor desempenho em motores de alta performance',
        'Maior estabilidade de preço'
      ],
      desvantagens: [
        'Maior emissão de poluentes',
        'Preço geralmente mais alto',
        'Maior impacto ambiental'
      ],
      eficiencia: 'Média de 12-14 km/l em carros populares'
    },
    {
      nome: 'Gasolina Aditivada',
      descricao: 'Gasolina com aditivos detergentes e dispersantes.',
      vantagens: [
        'Limpeza do sistema de combustível',
        'Melhor desempenho do motor',
        'Menor formação de depósitos'
      ],
      desvantagens: [
        'Preço mais alto que a gasolina comum',
        'Benefícios podem variar por marca'
      ],
      eficiencia: 'Similar à gasolina comum, com pequena melhoria'
    },
    {
      nome: 'Etanol',
      descricao: 'Combustível renovável produzido a partir da cana-de-açúcar.',
      vantagens: [
        'Menor emissão de poluentes',
        'Preço geralmente mais baixo',
        'Combustível renovável'
      ],
      desvantagens: [
        'Menor autonomia (cerca de 30% menos que gasolina)',
        'Maior consumo',
        'Pode ter problemas em temperaturas muito baixas'
      ],
      eficiencia: 'Média de 8-10 km/l em carros populares'
    },
    {
      nome: 'GNV',
      descricao: 'Gás Natural Veicular, combustível gasoso comprimido.',
      vantagens: [
        'Menor custo por km rodado',
        'Menor emissão de poluentes',
        'Maior vida útil do motor'
      ],
      desvantagens: [
        'Custo alto de instalação',
        'Redução do porta-malas',
        'Menor disponibilidade de postos'
      ],
      eficiencia: 'Média de 12-15 km/m³'
    },
    {
      nome: 'Diesel',
      descricao: 'Combustível utilizado principalmente em veículos pesados.',
      vantagens: [
        'Maior eficiência energética',
        'Maior torque',
        'Menor consumo'
      ],
      desvantagens: [
        'Maior emissão de particulados',
        'Restrito a veículos específicos',
        'Preço mais alto'
      ],
      eficiencia: 'Média de 8-12 km/l em caminhões'
    }
  ];

  calcularConsumo() {
    if (!this.validarCamposConsumo()) {
      return;
    }

    if (this.distancia && this.litros) {
      this.consumoMedio = this.distancia / this.litros;
      this.mensagemErro = '';
    }
  }

  adicionarPosto() {
    if (!this.validarCamposPosto()) {
      return;
    }

    if (this.precoLitro) {
      const novoPosto: Posto = {
        id: this.proximoId++,
        preco: this.precoLitro,
        tipoCombustivel: this.tipoCombustivel || undefined
      };

      this.postos.push(novoPosto);
      this.atualizarEstatisticas();
      this.limparCamposPosto();
      this.mensagemErro = '';
    }
  }

  removerPosto(id: number) {
    this.postos = this.postos.filter(posto => posto.id !== id);
    this.atualizarEstatisticas();
  }

  mostrarInfoCombustivel(tipo: string) {
    this.combustivelSelecionado = this.combustiveis.find(c => c.nome === tipo) || null;
    this.showInfoCombustivel = true;
  }

  fecharInfoCombustivel() {
    this.showInfoCombustivel = false;
    this.combustivelSelecionado = null;
  }

  private atualizarEstatisticas() {
    if (this.postos.length > 0) {
      this.mediaPrecos = this.postos.reduce((acc, posto) => acc + posto.preco, 0) / this.postos.length;
      this.precoMaisBarato = Math.min(...this.postos.map(posto => posto.preco));
      this.precoMaisCaro = Math.max(...this.postos.map(posto => posto.preco));
    } else {
      this.mediaPrecos = null;
      this.precoMaisBarato = null;
      this.precoMaisCaro = null;
    }
  }

  private validarCamposConsumo(): boolean {
    if (!this.distancia || !this.litros) {
      this.mensagemErro = 'Preencha todos os campos obrigatórios.';
      return false;
    }
    return true;
  }

  private validarCamposPosto(): boolean {
    if (!this.precoLitro) {
      this.mensagemErro = 'Preencha todos os campos obrigatórios.';
      return false;
    }
    return true;
  }

  private limparCamposPosto() {
    this.precoLitro = null;
    this.tipoCombustivel = '';
  }

  limparTudo() {
    this.distancia = null;
    this.litros = null;
    this.consumoMedio = null;
    this.postos = [];
    this.mediaPrecos = null;
    this.precoMaisBarato = null;
    this.precoMaisCaro = null;
    this.mensagemErro = '';
    this.limparCamposPosto();
  }
} 