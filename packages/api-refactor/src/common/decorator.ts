import { Type, applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { ApiResponseDto } from './dto/api-response.dto';

const baseTypeNames = ['String', 'Number', 'Boolean'];

/**
 * @description: 生成返回结果装饰器
 */
export const ApiResponseResult = <TModel extends Type<any>>({
  type,
  isArray,
  isPage,
  status,
}: {
  type?: TModel;
  isArray?: boolean;
  isPage?: boolean;
  status?: HttpStatus;
}) => {
  let prop;

  if (isArray) {
    if (isPage) {
      prop = {
        type: 'object',
        properties: {
          items: { type: 'array', items: { $ref: getSchemaPath(type!) } },
          meta: {
            type: 'object',
            properties: {
              itemCount: { type: 'number', default: 0 },
              totalItems: { type: 'number', default: 0 },
              itemsPerPage: { type: 'number', default: 0 },
              totalPages: { type: 'number', default: 0 },
              currentPage: { type: 'number', default: 0 },
            },
          },
        },
      };
    } else {
      prop = { type: 'array', items: { $ref: getSchemaPath(type!) } };
    }
  } else if (type) {
    if (type && baseTypeNames.includes(type.name)) {
      prop = { type: type.name.toLocaleLowerCase() };
    } else {
      prop = { $ref: getSchemaPath(type) };
    }
  } else {
    prop = { type: 'null', default: null };
  }

  return applyDecorators(
    ApiExtraModels(ApiResponseDto, type!),
    ApiResponse({
      status,
      schema: {
        allOf: [
          { $ref: getSchemaPath(ApiResponseDto) },
          { properties: { data: prop } },
        ],
      },
    }),
  );
};

// 处理字符串类型的响应
export const ApiStringResponse = () => {
  return applyDecorators(
    ApiExtraModels(ApiResponseDto),
    ApiResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(ApiResponseDto) },
          {
            properties: {
              data: {
                type: 'string',
                example: 'example string value',
              },
            },
          },
        ],
      },
    }),
  );
};

// 处理数字类型的响应
export const ApiNumberResponse = () => {
  return applyDecorators(
    ApiExtraModels(ApiResponseDto),
    ApiResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(ApiResponseDto) },
          {
            properties: {
              data: {
                type: 'number',
                example: 123,
              },
            },
          },
        ],
      },
    }),
  );
};

// 处理布尔类型的响应
export const ApiBooleanResponse = () => {
  return applyDecorators(
    ApiExtraModels(ApiResponseDto),
    ApiResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(ApiResponseDto) },
          {
            properties: {
              data: {
                type: 'boolean',
                example: true,
              },
            },
          },
        ],
      },
    }),
  );
};
