import { Sequelize } from "sequelize-typescript";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ListProductUseCase from "./list.product.usecase";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "../create/create.product.usecase";

const product1 = ProductFactory.create("a", "Product1", 100);

const product2 = ProductFactory.create("b", "Product2", 200);

describe("Unit test for listing product use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should list a product", async () => {
    const productRepository = new ProductRepository();

    const productCreateUseCase = new CreateProductUseCase(productRepository);

    await productCreateUseCase.execute(product1);
    await productCreateUseCase.execute(product2);

    const useCase = new ListProductUseCase(productRepository);

    const output = await useCase.execute({});

    expect(output.products.length).toBe(2);

    expect(output.products[0].id).toEqual(expect.any(String)),
    expect(output.products[0].name).toBe(product1.name);
    expect(output.products[0].price).toBe(product1.price);

    expect(output.products[1].id).toEqual(expect.any(String)),
    expect(output.products[1].name).toBe(product2.name);
    expect(output.products[1].price).toBe(product2.price);
  });
});
