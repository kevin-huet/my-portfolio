const express = require('express')
const router = express.Router()
const { Client } = require("@notionhq/client")

const notion = new Client({ auth: process.env.NOTION_SECRET })
const databaseId = process.env.NOTION_DB

async function addItem(req, res) {
    const { email, name, reason, message } = req.body
    try {
        const response = await notion.pages.create({
            parent: { database_id: databaseId },
            properties: {
                email: {
                    title:[
                         {
                            "text": {
                                "content": email
                            }
                        }
                    ]
                },
                name: {
                    rich_text:[
                        {
                            "text": {
                                "content": name
                            }
                        }
                    ]
                },
                reason: {
                    rich_text:[
                        {
                            "text": {
                                "content": reason
                            }
                        }
                    ]
                },
                message: {
                    rich_text:[
                        {
                            "text": {
                                "content": message
                            }
                        }
                    ]
                }
            },
        })
        console.log("Success! Entry added.")
        return res.status(200).json({ message: 'Your message has been sent.' })
    } catch (error) {
        return res.status(400).json({ message: 'There was a problem sending your message, please try again later' })
    }
}

router.post('/', addItem, async (req, res) => {})

module.exports = router;
