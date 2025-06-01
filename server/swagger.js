const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Sport Shop API',
            version: '1.0.0',
            description: 'API documentation for Sport Shop application',
        },
        servers: [
            {
                url: 'http://localhost:5000',
                description: 'Development server',
            },
        ],
        components: {
            schemas: {
                User: {
                    type: 'object',
                    required: ['name', 'email', 'password'],
                    properties: {
                        name: {
                            type: 'string',
                            description: 'User name'
                        },
                        email: {
                            type: 'string',
                            description: 'User email address',
                            format: 'email'
                        },
                        password: {
                            type: 'string',
                            description: 'User password',
                            format: 'password'
                        },
                        role: {
                            type: 'string',
                            enum: ['user', 'admin'],
                            default: 'user',
                            description: 'User role'
                        },
                        phone: {
                            type: 'string',
                            description: 'User phone number'
                        },
                        address: {
                            type: 'object',
                            properties: {
                                street: { type: 'string' },
                                city: { type: 'string' },
                                state: { type: 'string' },
                                zipCode: { type: 'string' },
                                country: { type: 'string' }
                            }
                        },
                        dateOfBirth: {
                            type: 'string',
                            format: 'date',
                            description: 'User date of birth'
                        },
                        gender: {
                            type: 'string',
                            enum: ['male', 'female', 'other'],
                            description: 'User gender'
                        },
                        isActive: {
                            type: 'boolean',
                            default: true,
                            description: 'User account status'
                        },
                        isVerified: {
                            type: 'boolean',
                            default: false,
                            description: 'Email verification status'
                        }
                    }
                },
                UserResponse: {
                    type: 'object',
                    properties: {
                        _id: {
                            type: 'string',
                            description: 'User ID'
                        },
                        name: {
                            type: 'string'
                        },
                        email: {
                            type: 'string'
                        },
                        role: {
                            type: 'string'
                        },
                        phone: {
                            type: 'string'
                        },
                        address: {
                            type: 'object',
                            properties: {
                                street: { type: 'string' },
                                city: { type: 'string' },
                                state: { type: 'string' },
                                zipCode: { type: 'string' },
                                country: { type: 'string' }
                            }
                        },
                        dateOfBirth: {
                            type: 'string',
                            format: 'date'
                        },
                        gender: {
                            type: 'string'
                        },
                        isActive: {
                            type: 'boolean'
                        },
                        isVerified: {
                            type: 'boolean'
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time'
                        },
                        updatedAt: {
                            type: 'string',
                            format: 'date-time'
                        }
                    }
                },
                MongoDBUser: {
                    allOf: [
                        { $ref: '#/components/schemas/User' },
                        {
                            type: 'object',
                            properties: {
                                _id: {
                                    type: 'string',
                                    description: 'MongoDB document ID'
                                },
                                createdAt: {
                                    type: 'string',
                                    format: 'date-time',
                                    description: 'Record creation timestamp'
                                },
                                updatedAt: {
                                    type: 'string',
                                    format: 'date-time',
                                    description: 'Record last update timestamp'
                                },
                                lastLogin: {
                                    type: 'string',
                                    format: 'date-time',
                                    description: 'Last login timestamp'
                                },
                                otp: {
                                    type: 'string',
                                    description: 'One-time password for verification'
                                },
                                otpExpires: {
                                    type: 'string',
                                    format: 'date-time',
                                    description: 'OTP expiration timestamp'
                                }
                            }
                        }
                    ]
                },
                MongoDBResponse: {
                    type: 'object',
                    properties: {
                        success: {
                            type: 'boolean',
                            description: 'Operation success status'
                        },
                        message: {
                            type: 'string',
                            description: 'Response message'
                        },
                        data: {
                            type: 'object',
                            description: 'MongoDB document data'
                        },
                        error: {
                            type: 'string',
                            description: 'Error message if operation failed'
                        }
                    }
                }
            },
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
    },
    apis: ['./routes/index.js'],
};

const specs = swaggerJsdoc(options);

module.exports = {
    swaggerUi,
    specs,
};
