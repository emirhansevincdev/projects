<?php

return [
    'meta' => [
        'title' => 'Kervea — Ruta de la Seda Moderna · Red de Emparejamiento Comercial B2B',
        'description' => 'Red B2B que conecta a compradores y vendedores directamente con datos de Trademap y aduanas. Sin intermediarios ni comisiones. Registro gratuito, Premium 280 USD/año.',
        'keywords' => 'comercio B2B, exportación, importación, Trademap, buscar compradores, buscar proveedores, exportación Turquía, datos aduaneros, Ruta de la Seda, código HS',
    ],

    'nav' => [
        'home' => 'Inicio',
        'about' => 'Nosotros',
        'features' => 'Características',
        'pricing' => 'Precios',
        'faq' => 'Preguntas Frecuentes',
        'contact' => 'Contacto',
        'login' => 'Iniciar Sesión',
        'register' => 'Registro Gratuito',
        'dashboard' => 'Panel',
    ],

    'hero' => [
        'badge' => 'Red B2B Ruta de la Seda Moderna',
        'title' => 'Emparejamiento Directo entre Compradores y Proveedores',
        'subtitle' => 'Comercio B2B sin intermediarios y sin comisiones respaldado por Trademap y datos aduaneros oficiales.',
        'cta_primary' => 'Empezar Ahora',
        'cta_secondary' => '¿Cómo Funciona?',
    ],

    'common' => [
        'search' => 'Buscar...',
        'filter' => 'Filtrar',
        'save' => 'Guardar',
        'cancel' => 'Cancelar',
        'delete' => 'Eliminar',
        'edit' => 'Editar',
        'view' => 'Ver',
        'download' => 'Descargar',
        'upload' => 'Subir',
        'send' => 'Enviar',
        'loading' => 'Cargando...',
        'success' => 'Éxito',
        'error' => 'Error',
        'warning' => 'Advertencia',
        'info' => 'Información',
        'yes' => 'Sí',
        'no' => 'No',
        'all' => 'Todos',
        'close' => 'Cerrar',
    ],

    'faq' => [
        'title' => 'Preguntas Frecuentes',
        'q1' => [
            'question' => '¿Qué es Kervea?',
            'answer' => 'Kervea es una red B2B que conecta directamente a vendedores y compradores utilizando datos de Trademap y aduanas oficiales. No es un intermediario y no cobra comisiones. El registro es gratuito y la suscripción Premium cuesta 280 USD/año. El corredor principal inicial es entre Turquía y África Occidental.',
        ],
        'q2' => [
            'question' => '¿En qué se diferencia Kervea de Alibaba o plataformas similares?',
            'answer' => 'Tenemos tres diferencias fundamentales: Primero, Kervea no es un intermediario — compradores y vendedores se comunican directamente. Segundo, el posicionamiento no se compra — las empresas se clasifican únicamente por su puntuación de compatibilidad. Tercero, tarifas transparentes — 280 USD/año tarifa fija Premium.',
        ],
        'q3' => [
            'question' => '¿Cómo verifica Kervea a sus miembros?',
            'answer' => 'Kervea aplica un sistema de verificación de 4 niveles: (1) verificación de correo electrónico, (2) registro comercial oficial, (3) coincidencia de cuenta bancaria e IBAN, (4) verificación opcional sobre el terreno.',
        ],
        'q4' => [
            'question' => '¿Cuál es la estructura de precios de Kervea?',
            'answer' => 'El registro básico es completamente gratuito. La suscripción Premium tiene un precio fijo de 280 USD/año e incluye búsquedas ilimitadas, soporte prioritario y acceso a informes de datos comerciales sin comisiones adicionales.',
        ],
        'q5' => [
            'question' => '¿Qué países cubre Kervea?',
            'answer' => 'En su fase piloto, se enfoca en el corredor Turquía - África Occidental (Senegal, Costa de Marfil, Nigeria, Marruecos, Ghana). Próximamente se añadirán el Norte de África, los países del Golfo y la CEI.',
        ],
        'q6' => [
            'question' => '¿Qué infraestructura de pago y logística ofrece Kervea?',
            'answer' => 'Admite métodos internacionales estándar como Carta de Crédito (LC) y Transferencia Bancaria (TT), además de integración con socios logísticos bajo estándares INCOTERMS. Kervea no interviene en las transacciones.',
        ],
    ],

    'plans' => [
        'title' => 'Planes de Membresía Flexibles',
        'subtitle' => 'Sin tarifas ocultas, sin comisiones.',
        'free' => [
            'name' => 'Membresía Gratuita',
            'price' => '0 USD',
            'period' => 'Para siempre',
            'description' => 'Listado de productos, vista de registro Trademap, historial comercial y puntuación de compatibilidad',
            'button' => 'Empieza Gratis',
        ],
        'premium' => [
            'name' => 'Membresía Premium',
            'price' => '280 USD',
            'period' => 'Anual',
            'description' => 'Acceso a correo, teléfono y nombre completo de empresas verificadas; búsquedas ilimitadas; alertas de coincidencias; exportación a Excel/CSV',
            'button' => 'Cambiar a Premium',
        ],
    ],

    'validation' => [
        'file_not_selected' => 'No se ha seleccionado ningún archivo.',
        'file_too_large' => 'El archivo es demasiado grande (Máximo :max MB).',
        'invalid_file_type_image' => 'Tipo de archivo no permitido. Solo se aceptan JPEG, PNG y WebP.',
        'invalid_file_type_pdf' => 'Tipo de archivo no permitido. Solo se aceptan JPEG, PNG, WebP y PDF.',
        'security_file_not_allowed' => 'Aviso de seguridad: Tipo de archivo no permitido.',
        'max_file_limit' => 'Solo puedes subir un máximo de :count archivos a la vez.',
        'only_image_allowed' => 'Solo se permiten imágenes (JPEG, PNG, WebP) en este campo.',
        'content_mismatch' => 'El contenido del archivo no coincide con su extensión.',
        'file_rejected_title' => 'Archivo Rechazado',
        'required_field' => 'Este campo es obligatorio.',
        'invalid_email' => 'Por favor, introduce un correo electrónico válido.',
    ],

    'notifications' => [
        'upload_success' => 'Archivo subido correctamente.',
        'profile_updated' => 'Datos del perfil actualizados.',
        'match_found' => '¡Se ha encontrado un nuevo emparejamiento!',
        'session_expired' => 'Sesión expirada, por favor inicia sesión de nuevo.',
        'server_error' => 'Ocurrió un error al comunicarse con el servidor.',
    ],
];