import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateFolderDto } from './dto/create-folder.dto';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';

@Injectable()
export class MaterialsService {
  updateFolder(id: string, updateFolderDto: UpdateFolderDto) {
      throw new Error('Method not implemented.');
  }
  constructor(private readonly prisma: PrismaService) {}

  async createFolder(createFolderDto: CreateFolderDto) {
    return this.prisma.folder.create({
      data: {
        title: createFolderDto.title,
      },
    });
  }

  async createDocument(createDocumentDto: CreateDocumentDto) {
    return this.prisma.document.create({
      data: {
        title: createDocumentDto.title,
        content: createDocumentDto.content,
        folderId: createDocumentDto.folderId,
      },
    });
  }

  async getFolders() {
    return this.prisma.folder.findMany({
      include: { documents: true },
    });
  }

  async getFoldersById(id: string) {
    return this.prisma.folder.findUnique({
      where: { id },
      include: { documents: true },
    });
  }

  async updateDocument(id: string, updateDocumentDto: UpdateDocumentDto) {
    return this.prisma.document.update({
      where: { id },
      data: updateDocumentDto,
    });
  }

  async deleteFolder(id: string) {
    return this.prisma.folder.delete({
      where: { id },
    });
  }

  async deleteDocument(id: string) {
    return this.prisma.document.delete({
      where: { id },
    });
  }
}
