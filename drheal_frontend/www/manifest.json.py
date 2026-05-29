import frappe
import json

def get_context(context):

    manifest = {
        "name": "Dr.Heal Pain Cure Hospital",
        "short_name": "Dr.Heal",
        "id": "/?source=pwa",
        "start_url": "/?source=pwa",
        "scope": "/",
        "display": "standalone",
        "display_override": ["standalone", "minimal-ui"],
        "background_color": "#000000",
        "theme_color": "#000000",
        "description": "Mobile App PWA for Dr.Heal Pain Cure Hospital",
        "categories": ["business", "productivity", "utilities"],
        "dir": "auto",
        "lang": "en",
        "orientation": "portrait",
        "prefer_related_applications": False,

        "protocol_handlers": [
            {
                "protocol": "web+drheal",
                "url": "/?open_pwa=true"
            }
        ],

        "related_applications": [
            {
                "platform": "webapp",
                "url": "https://www.drheal.in/"
            }
        ],

        "icons": [
            {
                "src": "/files/pwa-192x192.png",
                "sizes": "192x192",
                "type": "image/png",
                "purpose": "any"
            },
            {
                "src": "/files/pwa-512x512.png",
                "sizes": "512x512",
                "type": "image/png",
                "purpose": "any"
            },
            {
                "src": "/files/pwa-maskable-192x192.png",
                "sizes": "192x192",
                "type": "image/png",
                "purpose": "maskable"
            },
            {
                "src": "/files/pwa-maskable-512x512.png",
                "sizes": "512x512",
                "type": "image/png",
                "purpose": "maskable"
            }
        ],

        "screenshots": [
            {
                "src": "/files/dr-rakesh-profile.jpeg",
                "sizes": "1080x2304",
                "type": "image/jpeg",
                "form_factor": "narrow",
                "label": "Dr Rakesh Profile"
            }
        ],

        "shortcuts": [
            {
                "name": "Todo",
                "short_name": "Todo",
                "url": "/app/todo",
                "description": "Open Todo List",
                "icons": [
                    {
                        "src": "/files/pwa-192x192.png",
                        "sizes": "192x192",
                        "type": "image/png"
                    }
                ]
            }
        ]
    }

    frappe.local.response.filename = "manifest.json"
    frappe.local.response.mimetype = "application/manifest+json"
    frappe.local.response.response = json.dumps(manifest)