import { Sequelize } from "sequelize-typescript";
import ProductFactory from "../../../domain/product/factory/product.factory";
import { UpdateProductUseCase } from "./update.product.usecase";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "../create/create.product.usecase";

const input = {
  name: "Product",
  price: 100,
};

describe("Unit test for product update use case", () => {
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

  it("should update a product", async () => {
    const productRepository = new ProductRepository();

    const productCreateUseCase = new CreateProductUseCase(productRepository);

    const output1 = await productCreateUseCase.execute(input);

    const productUpdateUseCase = new UpdateProductUseCase(productRepository);

    const output = await productUpdateUseCase.execute(output1);

    expect(output).toEqual(output1);
  });
});
