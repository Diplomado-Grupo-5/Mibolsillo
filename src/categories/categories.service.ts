import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  private categories: Category[] = [];
  private nextId = 1;

  // Crear categoría
  create(dto: CreateCategoryDto): Category {
    const newCategory: Category = {
      id: this.nextId++,
      name: dto.name,
      description: dto.description,
      isActive: true,
      createdAt: new Date().toISOString(),
    };

    this.categories.push(newCategory);
    return newCategory;
  }

  // Obtener todas las categorías
  findAll(): Category[] {
    return this.categories;
  }

  // Obtener una categoría por id
  findOne(id: number): Category {
    const found = this.categories.find((c) => c.id === id);
    if (!found) throw new NotFoundException(`Category ${id} no existe`);
    return found;
  }

  // Actualizar categoría
  update(id: number, dto: UpdateCategoryDto): Category {
    const category = this.findOne(id);
    Object.assign(category, dto);
    return category;
  }

  // Eliminar categoría
  remove(id: number): void {
    const idx = this.categories.findIndex((c) => c.id === id);
    if (idx === -1) throw new NotFoundException(`Category ${id} no existe`);
    this.categories.splice(idx, 1);
  }
}
