import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputUpdateProductDto } from "./update.product.dto";

export class UpdateProductUseCase {
  private productRepository: ProductRepositoryInterface;

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }

  async execute(input: InputUpdateProductDto) {
    const product = await this.productRepository.find(input.id);
    product.changeName(input.name);
    product.changePrice(input.price);

    this.productRepository.update(product);

    return {
      id: product.id,
      name: product.name,
      price: product.price,
    };
  }
}
