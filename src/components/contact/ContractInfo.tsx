"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { CONTACT_INFO } from "@/constants/contact"

const ContactInfo = () => {
  return (
    <>
      {CONTACT_INFO.map((info, index) => (
        <motion.div
          key={info.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
        >
          <Card className="hover:shadow-md transition-shadow duration-300">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <info.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm sm:text-base">{info.title}</h4>
                  <a
                    href={info.href}
                    className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors"
                  >
                    {info.value}
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </>
  )
}

export default ContactInfo
