import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { MaterialsService } from './materials.service';
import { CreateFolderDto } from './dto/create-folder.dto';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';

@Controller('material')
export class MaterialsController {
  constructor(private readonly materialsService: MaterialsService) {}

  @Post('create-folder')
  createFolder(@Body() createFolderDto: CreateFolderDto) {
    return this.materialsService.createFolder(createFolderDto);
  }

  @Post('create-document')
  createDocument(@Body() createDocumentDto: CreateDocumentDto) {
    return this.materialsService.createDocument(createDocumentDto);
  }

  @Get('get-all-folders')
  getFolders() {
    return this.materialsService.getFolders();
  }

  @Get('folder/:id')
  getFolderById(@Param('id') id: string) {
    return this.materialsService.getFoldersById(id);
  }

  @Patch('update-folder/:id')
  updateFolder(
    @Param('id') id: string,
    @Body() updateFolderDto: UpdateFolderDto,
  ) {
    return this.materialsService.updateFolder(id, updateFolderDto);
  }

  @Patch('update-document/:id')
  updateDocument(
    @Param('id') id: string,
    @Body() updateDocumentDto: UpdateDocumentDto,
  ) {
    return this.materialsService.updateDocument(id, updateDocumentDto);
  }

  @Delete('delete-folder/:id')
  deleteFolder(@Param('id') id: string) {
    return this.materialsService.deleteFolder(id);
  }

  @Delete('delete-document/:id')
  deleteDocument(@Param('id') id: string) {
    return this.materialsService.deleteDocument(id);
  }
}
