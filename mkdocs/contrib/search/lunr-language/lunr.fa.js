/*!
 * Lunr languages, `Persian` (Farsi) language
 * https://github.com/MihaiValentin/lunr-languages
 *
 * Copyright 2023, Seyed Masih Sajadi
 * http://www.mozilla.org/MPL/
 *
 * NOTE: the file has been forked from `lunr.ar.js` file
 */
/*!
 * based on
 * Kazem Taghva, Rania Elkhoury, and Jeffrey Coombs (2005)
 * Meryeme Hadni, Abdelmonaime Lachkar, and S. Alaoui Ouatik (2012)
 *
 * Snowball JavaScript Library v0.3
 * http://code.google.com/p/urim/
 * http://snowball.tartarus.org/
 *
 * Copyright 2010, Oleg Mazko
 * http://www.mozilla.org/MPL/
 */

/**
 * export the module via AMD, CommonJS or as a browser global
 * Export code from https://github.com/umdjs/umd/blob/master/returnExports.js
 */
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(factory);
  } else if (typeof exports === 'object') {
    /**
     * Node. Does not work with strict CommonJS, but
     * only CommonJS-like environments that support module.exports,
     * like Node.
     */
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    factory()(root.lunr);
  }
})(this, function() {
  /**
   * Just return a value to define the module export.
   * This example returns an object, but the module
   * can return a function as the exported value.
   */
  return function(lunr) {
    /* throw error if lunr is not yet included */
    if ('undefined' === typeof lunr) {
      throw new Error(
        'Lunr is not present. Please include / require Lunr before this script.'
      );
    }

    /* throw error if lunr stemmer support is not yet included */
    if ('undefined' === typeof lunr.stemmerSupport) {
      throw new Error(
        'Lunr stemmer support is not present. Please include / require Lunr stemmer support before this script.'
      );
    }

    /* register specific locale function */
    lunr.fa = function() {
      this.pipeline.reset();
      this.pipeline.add(
        lunr.fa.trimmer,
        lunr.fa.stopWordFilter,
        lunr.fa.stemmer
      );

      // for lunr version 2
      // this is necessary so that every searched word is also stemmed before
      // in lunr <= 1 this is not needed, as it is done using the normal pipeline
      if (this.searchPipeline) {
        this.searchPipeline.reset();
        this.searchPipeline.add(lunr.fa.stemmer);
      }
    };

    const wordCharacters =
      '\u0621-\u06ef\u0671\u0688-\u069A\u06A9\u06AF\u06CC\u0640';

    /* lunr trimmer function */
    lunr.fa.wordCharacters = wordCharacters;
    lunr.fa.trimmer = lunr.trimmerSupport.generateTrimmer(
      lunr.fa.wordCharacters
    );

    lunr.Pipeline.registerFunction(lunr.fa.trimmer, 'trimmer-fa');

    // Refernece: https://github.com/kharazi/persian-stopwords
    const stopWords =
      'و در به از كه مي اين است را با هاي براي آن يك شود شده خود ها كرد شد اي تا كند بر بود گفت نيز وي هم كنند دارد ما كرده يا اما بايد دو اند هر خواهد او مورد آنها باشد ديگر مردم نمي بين پيش پس اگر همه صورت يكي هستند بي من دهد هزار نيست استفاده داد داشته راه داشت چه همچنين كردند داده بوده دارند همين ميليون سوي شوند بيشتر بسيار روي گرفته هايي تواند اول نام هيچ چند جديد بيش شدن كردن كنيم نشان حتي اينكه ولی توسط چنين برخي نه ديروز دوم درباره بعد مختلف گيرد شما گفته آنان بار طور گرفت دهند گذاري بسياري طي بودند ميليارد بدون تمام كل تر  براساس شدند ترين امروز باشند ندارد چون قابل گويد ديگري همان خواهند قبل آمده اكنون تحت طريق گيري جاي هنوز چرا البته كنيد سازي سوم كنم بلكه زير توانند ضمن فقط بودن حق آيد وقتي اش يابد نخستين مقابل خدمات امسال تاكنون مانند تازه آورد فكر آنچه نخست نشده شايد چهار جريان پنج ساخته زيرا نزديك برداري كسي ريزي رفت گردد مثل آمد ام بهترين دانست كمتر دادن تمامي جلوگيري بيشتري ايم ناشي چيزي آنكه بالا بنابراين ايشان بعضي دادند داشتند برخوردار نخواهد هنگام نبايد غير نبود ديده وگو داريم چگونه بندي خواست فوق ده نوعي هستيم ديگران همچنان سراسر ندارند گروهي سعي روزهاي آنجا يكديگر كردم بيست بروز سپس رفته آورده نمايد باشيم گويند زياد خويش همواره گذاشته شش  نداشته شناسي خواهيم آباد داشتن نظير همچون باره نكرده شان سابق هفت دانند جايي بی جز زیرِ رویِ سریِ تویِ جلویِ پیشِ عقبِ بالایِ خارجِ وسطِ بیرونِ سویِ کنارِ پاعینِ نزدِ نزدیکِ دنبالِ حدودِ برابرِ طبقِ مانندِ ضدِّ هنگامِ برایِ مثلِ بارة اثرِ تولِ علّتِ سمتِ عنوانِ قصدِ روب جدا کی که چیست هست کجا کجاست کَی چطور کدام آیا مگر چندین یک چیزی دیگر کسی بعری هیچ چیز جا کس هرگز یا تنها بلکه خیاه بله بلی آره آری مرسی البتّه لطفاً ّه انکه وقتیکه همین پیش مدّتی هنگامی مان تان';

    /* lunr stemmer function */
    lunr.fa.stemmer = (function() {
      var self = this;
      var word = '';
      self.result = false;
      self.preRemoved = false;
      self.sufRemoved = false;

      // prefix data
      // Reference: https://fa.wikipedia.org/wiki/%D9%BE%DB%8C%D8%B4%D9%88%D9%86%D8%AF
      self.pre = {
        pre1: 'آ ا ب پ ز س ش گ ن',
        pre2: 'ان آف ان با بر بس بی پت پس پی پر تک خر در دژ هز اف آز سر اس دش اش فر نا وا ور هم هن ان هو خو',
        pre3: 'ارد ابر باز بیش ابی ترا پاد پرا پسا پیش ریز فرا فرو',
        pre4: 'اندر ارتا پارا پیرا',
      };

      // Suffix data
      // Reference: https://fa.wikipedia.org/wiki/%D9%BE%D8%B3%D9%88%D9%86%D8%AF
      self.suf = {
        suf1: 'ا ش ک ک ه ی م',
        suf2: 'او اد ار اک ال ان بد پد تر چه ژه گر نا ند ور وش فش ان',
        suf3: 'آسا اور اده اله انه ایک این بار باز بان دان دیس زار سار سان سرا سیر فام کار کده کنت گار گان گاه گرد گری گون لاخ مان مند ناک نده وار وند',
        suf4: 'آگین اینه ترین ستان گانه گانی واره وانه',
        suf5: 'اومند اومند',
      };

      self.execArray = [
        'cleanWord',
        'removeDiacritics',
        'cleanAlef',
        'removeStopWords',
        'removePre432',
        'wordCheck',
      ];

      self.stem = function() {
        var counter = 0;
        self.result = false;
        self.preRemoved = false;
        self.sufRemoved = false;
        while (counter < self.execArray.length && self.result != true) {
          self.result = self[self.execArray[counter]]();
          counter++;
        }
      };

      self.setCurrent = function(word) {
        self.word = word;
      };

      self.getCurrent = function() {
        return self.word;
      };

      /*remove elongating character and test that the word does not contain non-arabic characters.
      If the word contains special characters, don't stem. */
      self.cleanWord = function() {
        var testRegex = new RegExp('[^' + wordCharacters + ']');
        self.word = self.word.replace(new RegExp('\u0640', 'g'), '');
        if (testRegex.test(word)) {
          return true;
        }
        return false;
      };

      self.removeDiacritics = function() {
        self.word = self.word.replace(/[\u064b-\u065b]/gi, '');
        return false;
      };

      /*Replace all variations of alef (آأإٱى) to a plain alef (ا)*/
      self.cleanAlef = function() {
        var alefRegex = new RegExp('[\u0622\u0623\u0625\u0671\u0649]');
        self.word = self.word.replace(alefRegex, '\u0627');
        return false;
      };

      /* if the word is a stop word, don't stem*/
      self.removeStopWords = function() {
        stopWords.split(' ');
        if (stopWords.indexOf(self.word) >= 0) {
          return true;
        }
      };

      /* remove prefixes of size 4, 3 and 2 characters  */
      self.removePre432 = function() {
        var word = self.word;
        if (self.word.length >= 7) {
          var pre4Regex = new RegExp(
            '^(' + self.pre.pre4.split(' ').join('|') + ')'
          );
          self.word = self.word.replace(pre4Regex, '');
        }
        if (self.word == word && self.word.length >= 6) {
          var pre3Regex = new RegExp(
            '^(' + self.pre.pre3.split(' ').join('|') + ')'
          );
          self.word = self.word.replace(pre3Regex, '');
        }
        if (self.word == word && self.word.length >= 5) {
          var pre2Regex = new RegExp(
            '^(' + self.pre.pre2.split(' ').join('|') + ')'
          );
          self.word = self.word.replace(pre2Regex, '');
        }
        if (word != self.word) self.preRemoved = true;
        return false;
      };

      /* remove prefixes of size 1 char*/
      self.removePre1 = function() {
        var word = self.word;
        if (self.preRemoved == false)
          if (self.word.length > 3) {
            var pre1Regex = new RegExp(
              '^(' + self.pre.pre1.split(' ').join('|') + ')'
            );
            self.word = self.word.replace(pre1Regex, '');
          }
        if (word != self.word) self.preRemoved = true;
        return false;
      };

      /*remove suffixes of size 1 char */
      self.removeSuf1 = function() {
        var word = self.word;
        if (self.sufRemoved == false)
          if (self.word.length > 3) {
            var suf1Regex = new RegExp(
              '(' + self.suf.suf1.split(' ').join('|') + ')$'
            );
            self.word = self.word.replace(suf1Regex, '');
          }
        if (word != self.word) self.sufRemoved = true;
        return false;
      };

      /*remove suffixes of size 5, 4, 3 and 2 chars*/
      self.removeSuf5432 = function() {
        var word = self.word;
        if (self.word.length >= 7) {
          var suf5Regex = new RegExp(
            '(' + self.suf.suf5.split(' ').join('|') + ')$'
          );
          self.word = self.word.replace(suf5Regex, '');
        }
        if (self.word.length >= 6) {
          var suf4Regex = new RegExp(
            '(' + self.suf.suf4.split(' ').join('|') + ')$'
          );
          self.word = self.word.replace(suf4Regex, '');
        }
        if (self.word == word && self.word.length >= 5) {
          var suf3Regex = new RegExp(
            '(' + self.suf.suf3.split(' ').join('|') + ')$'
          );
          self.word = self.word.replace(suf3Regex, '');
        }
        if (self.word == word && self.word.length >= 4) {
          var suf2Regex = new RegExp(
            '(' + self.suf.suf2.split(' ').join('|') + ')$'
          );
          self.word = self.word.replace(suf2Regex, '');
        }
        if (word != self.word) self.sufRemoved = true;
        return false;
      };

      /*check the word length and decide what is the next step accordingly*/
      self.wordCheck = function() {
        var word = self.word;
        var word7Exec = [self.removeSuf5432, self.removeSuf1, self.removePre1];
        var counter = 0;
        while (
          self.word.length >= 7 &&
          !self.result &&
          counter < word7Exec.length
        ) {
          word7Exec[counter]();
          counter++;
        }

        var word6Exec = [self.removeSuf5432, self.removeSuf1, self.removePre1];
        counter = 0;
        while (
          self.word.length == 6 &&
          !self.result &&
          counter < word6Exec.length
        ) {
          word6Exec[counter]();
          counter++;
        }

        var word5Exec = [self.removeSuf5432, self.removeSuf1, self.removePre1];
        counter = 0;
        while (
          self.word.length == 5 &&
          !self.result &&
          counter < word5Exec.length
        ) {
          word5Exec[counter]();
          counter++;
        }

        var word4Exec = [self.removeSuf1, self.removePre1, self.removeSuf5432];
        counter = 0;
        while (
          self.word.length == 4 &&
          !self.result &&
          counter < word4Exec.length
        ) {
          word4Exec[counter]();
          counter++;
        }
        return true;
      };

      /* and return a function that stems a word for the current locale */
      return function(token) {
        // for lunr version 2
        if (typeof token.update === 'function') {
          return token.update(function(word) {
            self.setCurrent(word);
            self.stem();
            return self.getCurrent();
          });
        } else {
          // for lunr version <= 1
          self.setCurrent(token);
          self.stem();
          return self.getCurrent();
        }
      };
    })();

    lunr.Pipeline.registerFunction(lunr.fa.stemmer, 'stemmer-fa');

    lunr.fa.stopWordFilter = lunr.generateStopWordFilter(stopWords.split(' '));
    lunr.Pipeline.registerFunction(lunr.fa.stopWordFilter, 'stopWordFilter-fa');
  };
});
