import datetime

class Codec:
    
    def __init__(self):
      self.tinyToUrl = {}
      # self.salt = 8325203962
      # self.num_chars = 7
      
    def encode(self, longUrl):
        """Encodes a URL to a shortened URL.
        
        :type longUrl: str
        :rtype: str
        """
        # add salt (datetime.now()) and truncate long numbers (modulo)
        tiny = hash(longUrl + str(datetime.datetime.now())) % 10000000
        while self.tinyToUrl.get(tiny):
          tiny = hash(longUrl + str(datetime.datetime.now())) % 10000000
          
        self.tinyToUrl[tiny] = longUrl
        return tiny

    def decode(self, shortUrl):
        """Decodes a shortened URL to its original URL.
        
        :type shortUrl: str
        :rtype: str
        """
        return self.tinyToUrl[shortUrl]
        

# Your Codec object will be instantiated and called as such:
# codec = Codec()
# codec.decode(codec.encode(url))