import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';

@Injectable()
export class MaterialsService {
  constructor(private readonly prisma: PrismaService) {}

  async createDocument(createDocumentDto: CreateDocumentDto) {
    return this.prisma.document.create({
      data: {
        title: createDocumentDto.title,
        content: createDocumentDto.content || '',
      },
    });
  }

  async getDocuments() {
    return this.prisma.document.findMany();
  }

  async getDocumentById(id: string) {
    return this.prisma.document.findUnique({
      where: { id },
    });
  }

  async updateDocument(id: string, updateDocumentDto: UpdateDocumentDto) {
    return this.prisma.document.update({
      where: { id },
      data: {
        title: updateDocumentDto.title,
        content: updateDocumentDto.content,
      },
    });
  }

  async deleteDocument(id: string) {
    return this.prisma.document.delete({
      where: { id },
    });
  }
}
