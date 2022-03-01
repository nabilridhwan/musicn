const supabase = require("@supabase/supabase-js")
require("dotenv").config()

const connection = supabase.createClient("https://scbuuqxjmhrfohxfjasa.supabase.co", process.env.SUPABASE_KEY)

module.exports = connection