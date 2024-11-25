import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { MaterialsService } from './materials.service';
import { CreateDocumentDto } from './dto/create-document.dto'; // Updated import
import { UpdateDocumentDto } from './dto/update-document.dto';

@Controller('material')
export class MaterialsController {
  constructor(private readonly materialsService: MaterialsService) {}

  @Post('create-document')
  createDocument(@Body() createDocumentDto: CreateDocumentDto) {
    return this.materialsService.createDocument(createDocumentDto);
  }

  @Get('get-all-documents')
  getDocuments() {
    return this.materialsService.getDocuments();
  }

  @Get('get-document/:id')
  getDocumentById(@Param('id') id: string) {
    return this.materialsService.getDocumentById(id);
  }

  @Put('update-document/:id')
  updateDocument(
    @Param('id') id: string,
    @Body() updateDocumentDto: UpdateDocumentDto,
  ) {
    return this.materialsService.updateDocument(id, updateDocumentDto);
  }

  @Delete('delete-document/:id')
  deleteDocument(@Param('id') id: string) {
    return this.materialsService.deleteDocument(id);
  }
}
